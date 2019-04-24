import { PluginStore } from './plugin-store'
import { PluginResolver } from './plugin-resolver'
import { IPluginInfo } from './plugin-info'
import { IGenerator, Generator } from './generator'
import { IValidatorError, IValidator } from './validator'
import { IPlugin } from './plugin'
import { passwordInfo } from './password-info'
import { runValidator } from './helpers/run-validator'

export type PasswordStrength = [number, IValidatorError[]]

export type PluginInfo = string|IPluginInfo

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

export class NeoCore {
  public generate: (len: number, generator: PluginInfo) => string
  public evaluate: (password: string, evaluators?: IEvaluator[]) => PasswordStrength
  public validate: (password: string,validators?: PluginInfo[]) => IValidatorError[]
  public generators: () => IGeneratorInfo[]

  constructor(config: INeoConfig, store: PluginStore, resolver: PluginResolver) {
    /**
     *
     */
    this.generate = function generate(len: number, generator: PluginInfo): string {
      const _generate = resolver.resolve<Generator>('generator', generator)
      return _generate(len)
    }

    /**
     *
     */
    this.evaluate = function evaluate(password: string, evaluators?: IEvaluator[]): PasswordStrength {
      evaluators = evaluators || config.evaluators

      if (!Array.isArray(evaluators) || evaluators.length === 0) {
        throw new Error('evaluate not configured correctly')
      }

      // Get the password info object.
      const info = passwordInfo(password)

      // Start with ideal strength and reduce for any validation error.
      let strength = 1

      // Get a list of warnings and do other work.
      const warnings = evaluators.reduce((list, evaluator) => {
        const { weight, validators } = evaluator

        // Process each validator and apply errors to the strength.
        validators.forEach((validator) => {
          const _validator = resolver.resolve<IValidator>('validator', validator)
          const errors = runValidator(_validator, info)

          // For every error, reduce strength.
          errors.forEach((error) => {
            if (typeof error.score === 'number') {
              // If the error has a score, multiply strength by the score.
              strength *= Math.min(error.score, 1.0)
            } else {
              // The validator doesn't provide a score. Use weight fallback.
              if (typeof weight !== 'number') {
                throw new Error('no fallback weight specified in configuration')
              }

              // Check that weight is in range.
              if (weight > 1.0 || weight < 0.0) {
                throw new Error('wieght must be in the range [0, 1]')
              }

              // Multiply the strength by the weight.
              strength *= weight
            }
          })

          // strength = strength * weight ** errors.length
          list.push.apply(list, errors)
        })

        return list
      }, [] as IValidatorError[])

      return [strength, warnings]
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
