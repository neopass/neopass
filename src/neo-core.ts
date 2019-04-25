import { PluginStore } from './plugin-store'
import { PluginResolver } from './plugin-resolver'
import { PluginInfo } from './plugin-info'
import { IGenerator, Generator } from './generator'
import { IValidatorError, IValidator } from './validator'
import { IPlugin } from './plugin'
import { passwordInfo } from './password-info'
import { runValidator } from './helpers/run-validator'

export interface IEvaluatorInfo {
  strength: number
  warnings: IValidatorError[]
}

export interface IEvaluator {
  weight?: number
  validators: PluginInfo[]
}

// Neopass configuration interface.
export interface INeoConfig {
  useBuiltinGenerators?: boolean
  useBuiltinValidators?: boolean
  plugins?: IPlugin[]
  validators?: PluginInfo[]
  evaluators?: IEvaluator[]
}

// Information about a registered generator.
export interface IGeneratorInfo {
  name: string
  title: string
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
  public generate: (len: number, generator: PluginInfo, validate?: number) => string
  public evaluate: (password: string, evaluators?: IEvaluator[]) => IEvaluatorInfo
  public validate: (password: string, validators?: PluginInfo[]) => IValidatorError[]
  public generators: () => IGeneratorInfo[]

  constructor(config: INeoConfig, store: PluginStore, resolver: PluginResolver) {
    /**
     *
     */
    this.generate = function generate(len: number, generator: PluginInfo, retry?: number): string {
      const _generate = resolver.resolve<Generator>('generator', generator)

      // Retry generation to pass validation.
      if (typeof retry === 'number') {
        let count = 0

        while(true) {
          if (++count > retry) {
            throw new Error('could not generate a password that passed configured validators')
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
      const pInfo = passwordInfo(password)

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
          const errors = runValidator(_validator, pInfo)
          // Update strength.
          strength = _applyEvalErrors(errors, strength, weight)
          // Add errors to the list.
          warningList.push.apply(warningList, errors)
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
    this.validate = function validate(password: string,validators?: PluginInfo[]): IValidatorError[] {
      // Get validators from config if not given in arg list.
      validators = Array.isArray(validators) && validators.length > 0
        ? validators : config.validators

      // Check that we have a non-zero-length array.
      if (!Array.isArray(validators) || validators.length === 0) {
        throw new Error('no validators specified')
      }

      // Map supplied validator references to plugins.
      const _validators = validators.map(validator =>
        resolver.resolve<IValidator>('validator', validator))

      // Get the password info object.
      const info = passwordInfo(password)

      /**
       * Get a list of validation errors by executing all
       * validators against the password and password info.
       */
      const errors = _validators.reduce((errList, validator) => {
        const _errors = runValidator(validator, info)
        return errList.push.apply(errList, _errors) && errList || errList
      }, [] as IValidatorError[])

      // Return generated errors.
      return errors
    }

    /**
     *
     */
    this.generators = function generators(): IGeneratorInfo[] {
      const generators = <IGenerator[]>store.getAll('generator')

      // Create a list of generator info objects.
      const infoList = generators.map((gen) => {
        return { name: gen.name, title: gen.title }
      })

      return infoList
    }
  }
}
