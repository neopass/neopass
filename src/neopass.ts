import { NeoPass } from './neo-pass'
import { Validator, IValidatorError } from './validator'
import { Generator } from './generator'
import { PluginInfo } from './plugin-info'
import { INeoConfig } from './neo-config'
import { IEvaluator } from './evaluator'
import { IEvaluatorInfo } from './evaluator-info'
import { IGeneratorInfo } from './generator-info'
import { IVerifyResult } from './verify-result'

import {
  ClassesValidator,
  DepthValidator,
  EntropyValidator,
  HexGenerator,
  LengthValidator,
  LettersNumbersGenerator,
  RandomGenerator,
  RunValidator,
  SequenceValidator,
  ShannonValidator,
  TopologyValidator,
  PassphraseDetector,
} from './plugins'

// Create a default configuration.
const _defaultConfig: INeoConfig = {
  useBuiltinGenerators: true,
  useBuiltinValidators: true,
}

// Built-in generators.
const _builtinGenerators: Generator[] = [
  HexGenerator,
  LettersNumbersGenerator,
  RandomGenerator,
]

// Built-in validators.
const _builtinValidators: Validator[] = [
  ClassesValidator,
  DepthValidator,
  EntropyValidator,
  LengthValidator,
  PassphraseDetector,
  RunValidator,
  SequenceValidator,
  ShannonValidator,
  TopologyValidator,
]

/**
 * Core class for neo functionality.
 */
let _core: NeoPass

/**
 *
 */
function instanceError(): never {
  throw new Error('configure neopass before calling neopass functions')
}

/**
 * Neopass instance.
 */
export function neopass(config?: INeoConfig|null) {
  if (!_core) {
    // Apply user config to default config.
    config = {..._defaultConfig, ...config}

    // Create the neopass core instance.
    _core = new NeoPass(
      config,
      config.useBuiltinGenerators ? _builtinGenerators : null,
      config.useBuiltinValidators ? _builtinValidators : null)
  } else {
    throw new Error('neopass is already configured')
  }

  return neopass
}

/**
 * Generate a password using the given generator reference.
 *
 * @param len the length of the password to generate
 * @param generator the name of the generator plugin to use
 * @param retries retry generation if password fails configured validation chain
 */
neopass.generate = function generate(
  len: number,
  generator: PluginInfo,
  retries?: number|null,
): string {
  if (!_core) { instanceError() }
  return _core.generate(len, generator, retries)
}

/**
 * Run evaluation chain against a password.
 *
 * @param password the password to evaluate
 * @param evaluators override configured evaluators
 */
neopass.evaluate = function evaluate(
  password: string,
  evaluators?: IEvaluator[]
): IEvaluatorInfo {
  if (!_core) { instanceError() }
  return _core.evaluate(password, evaluators)
}

/**
 * Run a validation chain against a password.
 *
 * @param password the password to validate
 * @param validators override configured validators
 */
neopass.validate = function validate(
  password: string,
  validators?: null|PluginInfo[]
): IValidatorError[] {
  if (!_core) { instanceError() }
  return _core.validate(password, validators)
}

/**
 * Run validation and evaluation to produce errors and warnings.
 *
 * @param password the password to verify
 * @param validators override configured validators
 * @param evaluators override configured evaluators
 */
neopass.verify = function verify(
  password: string,
  validators?: null|PluginInfo[],
  evaluators?: IEvaluator[]
): IVerifyResult {
  if (!_core) { instanceError() }
  return _core.verify(password, validators, evaluators)
}

/**
 * Get a list of registered generators.
 */
neopass.generators = function generators(): IGeneratorInfo[] {
  if (!_core) { instanceError() }
  return _core.generators()
}

// /**
//  *
//  */
// neopass.validators = {
//   classic: [
//     'length:min=10,max=72',
//     'classes:and=ul,or=ds',
//   ],
//   neo: [
//     'entropy:64',
//     'shannon:32',
//     'sequence:3',
//     'run:2',
//   ],
// }

// /**
//  *
//  */
// neopass.middleware = {
//   password: function (template?: string) {
//     return (req: any, res: any) => {
//       res.render(template)
//     }
//   },

//   generate: function (generators: any[]) {
//     return (req: any, res: any, next: () => void) => {
//       next()
//     }
//   },

//   validate: function () {
//     return (req: any, res: any, next: () => void) => {
//       next()
//     }
//   },

//   evaluate: function () {
//     return (req: any, res: any, next: () => void) => {
//       next()
//     }
//   }
// }
