import { IBaseConfig } from './base-config'
import { PluginStore } from './plugin-store'
import { PluginResolver } from './plugin-resolver'
import { PluginInfo } from '../plugin-info'
import { IGenerator, Generate } from '../generator'
import { IValidatorError, IValidator } from '../validator'
import { classDepth, topology as _topology } from '../topology'
import { IEvaluator } from '../evaluator'
import { IEvaluatorInfo } from '../evaluator-info'
import { IGeneratorInfo } from '../generator-info'
import { IDetector } from '../detector'
import { IRequestor } from '../requestor'

import {
  reduceClasses,
  entropy,
  shannon,
} from '../utils'

interface IPasswordInfo {
  readonly password: string
  readonly length: number
  readonly depth: number
  readonly topology: string
  readonly classes: string
  readonly entropy: number
  readonly shannon: number
}

export type RequestType = keyof IPasswordInfo

interface IRunResult<T> {
  halt: boolean
  data: T
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
function _runRequestor<T>(
  item: IRequestor<any>,
  info: IPasswordInfo,
  resolver: PluginResolver,
): IRunResult<T> {
  // Create a set of the requested stats items.
  const request = new Set(item.request || [])

  // The arguments to be passed to the validation handler.
  const args: any[] = []

  // Map request strings to their corresponding stats items.
  const _requests = [...request].map(r => info[<RequestType>r])

  // Add the request variables to the arguments.
  args.push.apply(args, _requests)

  // Run validation.
  // return item.exec(...args)
  const errors = item.exec(...args)

  const result = {
    halt: false,
    data: errors,
  }

  return result
}

/**
 * Update the given strength by applying validation error logic.
 */
function _applyEvalErrors(errors: IValidatorError[], strength: number, weight?: number): number {
  // Constrain weight to [0, 1] if it exists, 1.0 otherwise.
  const _weight = typeof weight === 'number'
    ? Math.min(Math.max(weight, 0), 1)
    : 1.0

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
 * miscellaneous logic.
 */
export class NeoCore {
  public generate: (len: number, generator: PluginInfo, retries?: number) => string
  public evaluate: (password: string, evaluators?: IEvaluator[]) => IEvaluatorInfo
  public validate: (password: string, validators?: null|PluginInfo[], passphrase?: PluginInfo) => IValidatorError[]
  public generators: () => IGeneratorInfo[]

  constructor(config: IBaseConfig, store: PluginStore, resolver: PluginResolver) {
    /**
     *
     */
    this.generate = function generate(len: number, generator: PluginInfo, retries?: number): string {
      const _generate = resolver.resolve<Generate>('generator', generator)

      if (retries && retries < 1) {
        throw new Error('retries must be 1 or more')
      }

      // Retry generation to pass validation.
      if (typeof retries === 'number') {
        let count = 0

        while(true) {
          if (++count > retries) {
            throw new Error('could not generate a password that passes configured validators')
          }

          const pass = _generate(len)
          const errors = this.validate(pass)

          if (errors.length === 0) {
            return pass
          }
        }

      } else {
        return _generate(len)
      }
    }

    /**
     *
     */
    this.evaluate = function evaluate(password: string, evaluators?: IEvaluator[]): IEvaluatorInfo {
      evaluators = evaluators || config.evaluators

      if (!Array.isArray(evaluators) || evaluators.length === 0) {
        throw new Error('no evaluators specified.')
      }

      // Get the password info object.
      const pInfo = _passwordInfo(password)

      // Start with ideal strength and reduce for any validation error.
      let strength = 1

      // Get a list of warnings and do other work.
      const warnings = evaluators.reduce((warningList, evaluator) => {
        const { weight, validators } = evaluator

        // Process each validator and apply errors to the strength.
        validators.forEach((validator) => {
          // Get the validator plugin.
          const _validator = resolver.resolve<IValidator>('validator', validator)
          // Run the validator.
          const result = _runRequestor<IValidatorError[]>(_validator, pInfo, resolver)
          // Update strength.
          strength = _applyEvalErrors(result.data, strength, weight)
          // Add errors to the list.
          warningList.push.apply(warningList, result.data)
        })

        return warningList
      }, [] as IValidatorError[])

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
      password: string, validators?: null|PluginInfo[], passphrase?: PluginInfo): IValidatorError[] {

      // Get the password info object.
      const info = _passwordInfo(password)

      // Get passphrase from config if not given in arg list.
      passphrase = passphrase || config.passphrase

      // Run passphrase detection.
      if (passphrase != null) {
        const detector = resolver.resolve<IDetector>('detector', passphrase)
        const result = _runRequestor<boolean>(detector, info, resolver)
        const isPassphrase = result.data
        // If a passphrase is detected, halt further validation.
        if (isPassphrase) { return [] }
      }

      // Get validators from config if not given in arg list.
      const hasValidators = Array.isArray(validators) && validators.length > 0
      validators = hasValidators ? validators : config.validators

      // Check that we have a non-zero-length array.
      if (!Array.isArray(validators) || validators.length === 0) {
        throw new Error('no validators specified')
      }

      // Map supplied validator references to plugins.
      const _validators = validators.map(validator =>
        resolver.resolve<IValidator>('validator', validator))

      /**
       * Get a list of validation errors by executing all
       * validators against the password and password info.
       */
      const errors: IValidatorError[] = []

      for (let i = 0; i < _validators.length; i++) {
        const validator = _validators[i]
        const result = _runRequestor<IValidatorError[]>(validator, info, resolver)
        errors.push.apply(errors, result.data)

        if (result.halt) {
          return errors
        }
      }

      // Return generated errors.
      return errors
    }

    /**
     *
     */
    this.generators = function generators(): IGeneratorInfo[] {
      const generators = store.getAll('generator') as IGenerator[]

      // Create a list of generator info objects.
      const infoList = generators.map((gen) => {
        return { name: gen.name, title: gen.title }
      })

      return infoList
    }
  }
}
