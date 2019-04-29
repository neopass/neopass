import { NeoPass } from './neo-pass'
import { Validator, IValidatorError } from './validator'
import { Generator } from './generator'
import { Detector } from './detector'
import { PluginInfo } from './plugin-info'
import { INeoConfig } from './neo-config'
import { IEvaluator } from './evaluator'
import { IEvaluatorInfo } from './evaluator-info'
import { IGeneratorInfo } from './generator-info'

import {
  ClassesValidator,
  DepthValidator,
  EntropyValidator,
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
  RandomGenerator,
  LettersNumbersGenerator,
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
 * Neopass instance.
 */
export function neopass(config?: INeoConfig|null) {
  if (!_core) {
    // Apply user config to default config.
    config = {..._defaultConfig, ...config}

    // Create the neopass core instance.
    _core = new NeoPass(
      config,
      config.useBuiltinGenerators ? _builtinGenerators : [],
      config.useBuiltinValidators ? _builtinValidators : [])
  }

  return neopass
}

/**
 * Generate a password using the given generator reference.
 */
function generate(len: number, generator: PluginInfo, retries?: number): string {
  return _core.generate(len, generator, retries)
}

neopass.generate = generate

/**
 * Run evaluation chain against a password.
 */
function evaluate(password: string, evaluators?: IEvaluator[]): IEvaluatorInfo {
  return _core.evaluate(password, evaluators)
}

neopass.evaluate = evaluate

/**
 * Run a validation chain against a password.
 */
function validate(password: string, validators?: null|PluginInfo[]): IValidatorError[] {
  return _core.validate(password, validators)
}

neopass.validate = validate

/**
 * Run a validation chain against a password.
 */
function verify(password: string) {
  const errors = neopass.validate(password)
  const info = neopass.evaluate(password)

  const report = {
    errors,
    warnings: info.warnings
  }

  return report
}

neopass.verify = verify

/**
 * Get a list of registered generators.
 */
function generators(): IGeneratorInfo[] {
  return _core.generators()
}

neopass.generators = generators

/**
 *
 */
neopass.validators = {
  classic: [
    'length:min=10,max=72',
    'classes:and=ul,or=ds',
  ],
  neo: [
    'entropy:64',
    'shannon:32',
    'sequence:3',
    'run:2',
  ],
}

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
