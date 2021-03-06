import { IBaseConfig } from './base-config'
import { PluginResolver } from './plugin-resolver'
import { PluginInfo } from '../plugin-info'
import { Generate } from '../generator'
import { IValidatorError, IValidator } from '../validator'
import { classDepth, topology as _topology } from '../topology'
import { IEvaluator } from '../evaluator'
import { IEvaluatorInfo } from '../evaluator-info'
import { IRequestor } from '../requestor'

import {
  reduceClasses,
  entropy,
  shannon,
} from '../utils'

export type RequestType = keyof IPasswordInfo

export interface IEvalCache {
  weight?: number
  validators: IValidator[]
}

interface IPasswordInfo {
  readonly password: string
  readonly length: number
  readonly depth: number
  readonly topology: string
  readonly classes: string
  readonly entropy: number
  readonly shannon: number
}

interface IRunResult {
  halt: boolean
  errors: IValidatorError[]
}

/**
 * Generate a password info object.
 */
function _passwordInfo(password: string): IPasswordInfo {
  const depth = classDepth(password)
  const topology = _topology(password).join('')

  const info = {
    password,
    depth,
    topology,
    length: password.length,
    classes: reduceClasses(topology),
    entropy: entropy(depth),
    shannon: shannon(password)
  }

  return info
}

/**
 * Run a validator against a password/info and return any errors
 * it generates.
 */
function _runRequestor(item: IRequestor<any>, info: IPasswordInfo): IRunResult {
  if (!Array.isArray(item.request) || typeof item.exec !== 'function') {
    throw new Error('requestor is misconfigured')
  }

  // Create a set of the requested stats items.
  const request = new Set(item.request)

  // The arguments to be passed to the validation handler.
  const args: any[] = []

  // Map request strings to their corresponding stats items.
  const _requests = [...request].map(r => info[<RequestType>r])

  // Add the request variables to the arguments.
  args.push.apply(args, _requests)

  // Run validation.
  const value = item.exec(...args)

  if (typeof value === 'boolean') {
    return { halt: value, errors: [] }
  }

  return { halt: false, errors: value }
}

/**
 * Update the given strength by applying validation error logic.
 */
function _applyEvalErrors(
  errors: null|undefined|IValidatorError[],
  strength: number,
  weight?: number
): number {
  // Constrain weight to [0, 1] if it exists, 1.0 otherwise.
  const _weight = typeof weight === 'number'
    ? Math.min(Math.max(weight, 0), 1)
    : 1.0

  // Account for null/undefined errors.
  errors = Array.isArray(errors) ? errors : []

  // For every error, reduce strength.
  errors.forEach((error) => {
    if (typeof error.score === 'number') {
      // If the error has a score, multiply strength by the score.
      strength *= _weight * Math.min(error.score, 1.0)
    } else {
      // Multiply the strength by the weight.
      strength *= _weight
    }
  })

  return strength
}

/**
 * The core instance for encapsulating validation, evaluation and
 * generation logic.
 */
export class NeoCore {
  /**
   * Generate a password using the given generator reference.
   *
   * @param len the length of the password to generate
   * @param generator the name of the generator plugin to use
   * @param retries retry generation if password fails configured validation chain
   */
  public generate: (len: number, generator: PluginInfo, retries?: number|null) => string

  /**
   * Run evaluation chain against a password.
   *
   * @param password the password to evaluate
   * @param evaluators override configured evaluators
   */
  public evaluate: (password: string, evaluators?: IEvaluator[]) => IEvaluatorInfo

  /**
   * Run a validation chain against a password.
   *
   * @param password the password to validate
   * @param validators override configured validators
   */
  public validate: (password: string, validators?: null|PluginInfo[]) => IValidatorError[]

  constructor(
    config: IBaseConfig,
    resolver: PluginResolver,
    preVal: IValidator[],
    preEval: IEvalCache[],
  ) {
    /**
     *
     */
    this.generate = function generate(
      len: number, generator: PluginInfo, retries?: number|null ): string {

      // Get the specified generator.
      const _generate = resolver.resolve<Generate>('generator', generator)

      // Retry generation to pass validation.
      if (typeof retries === 'number' && retries > 0) {
        // Run generate/validate loop until validation passes.
        for (let i = 0; i < retries; i++) {
          const password = _generate(len)
          const errors = this.validate(password)

          if (errors.length === 0) {
            return password
          }
        }

        throw new Error('could not generate a password that passes configured validators')

      } else {
        return _generate(len)
      }
    }

    /**
     *
     */
    this.evaluate = function evaluate(password: string, evaluators?: IEvaluator[]): IEvaluatorInfo {
      // Store configured evaluators.
      let _evaluators: IEvalCache[]

      // Get evaluators the arguments or use preconfigured ones.
      if (Array.isArray(evaluators) && evaluators.length > 0) {
        _evaluators = evaluators.map((e) => {
          // Preconfigure validators.
          const validators = e.validators.map((v) => {
            return resolver.resolve<IValidator>('validator', v)
          })
          return { weight: e.weight, validators }
        })
      } else {
        _evaluators = preEval
      }

      if (!Array.isArray(_evaluators) || _evaluators.length === 0) {
        throw new Error('no evaluators specified')
      }

      // Get the password info object.
      const pInfo = _passwordInfo(password)

      // Start with ideal strength and reduce for any validation error.
      let strength = 1

      // Get a list of warnings and do other work.
      const warnings = _evaluators.reduce((warningList, evaluator) => {
        const { weight, validators } = evaluator

        // Process each validator and apply errors to the strength.
        validators.forEach((validator) => {
          // Run the validator.
          const result = _runRequestor(validator, pInfo)
          // Update strength.
          strength = _applyEvalErrors(result.errors, strength, weight)
          // Add errors to the list.
          warningList.push.apply(warningList, result.errors)
        })

        return warningList
      }, [] as IValidatorError[])

      // Create and return an evaluator info object.
      const eInfo = {
        strength,
        warnings,
      }

      return eInfo
    }

    /**
     *
     */
    this.validate = function validate(
      password: string,
      validators?: null|PluginInfo[]
    ): IValidatorError[] {

      // Get the password info object.
      const info = _passwordInfo(password)

      // Store configured validators.
      let _validators: IValidator[]

      // Get validators the arguments or use preconfigured ones.
      if (Array.isArray(validators) && validators.length > 0) {
        _validators = validators.map((v) => {
          return resolver.resolve('validator', v)
        })
      } else {
        _validators = preVal
      }

      // Check that we have a non-zero-length array.
      if (!Array.isArray(_validators) || _validators.length === 0) {
        throw new Error('no validators specified')
      }

      /**
       * Get a list of validation errors by executing all
       * validators against the password and password info.
       */
      const errors: IValidatorError[] = []

      for (let i = 0; i < _validators.length; i++) {
        const validator = _validators[i]
        const result = _runRequestor(validator, info)
        errors.push.apply(errors, result.errors)

        if (result.halt) {
          return errors
        }
      }

      // Return generated errors.
      return errors
    }
  }
}
