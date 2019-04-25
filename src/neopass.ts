import { IPlugin } from './plugin'
import { PluginStore } from './plugin-store'
import { PluginResolver } from './plugin-resolver'
import { IValidatorError } from './validator'

import {
  NeoCore,
  INeoConfig,
  PluginInfo,
  IEvaluator,
  PasswordStrength,
  IGeneratorInfo
} from './neo-core'

// Plugins
import { RandomGenerator } from './plugins/random.generator'
import { LettersNumbersGenerator } from './plugins/letters-numbers.generator'
import { LengthValidator } from './plugins/length.validator'
import { DepthValidator } from './plugins/depth.validator'
import { EntropyValidator } from './plugins/entropy.validator'
import { ShannonValidator } from './plugins/shannon.validator'
import { ClassesValidator } from './plugins/classes.validator'
import { SequenceValidator } from './plugins/sequence.validator'
import { RunValidator } from './plugins/run.validator'
import { TopologyValidator } from './plugins/topology.validator'

// Create a default configuration.
const _defaultConfig: INeoConfig = {
  useBuiltinGenerators: true,
  useBuiltinValidators: true,
}

// Built-in generators.
const _builtinGenerators = [
  RandomGenerator,
  LettersNumbersGenerator,
]

// Built-in validators.
const _builtinValidators = [
  LengthValidator,
  DepthValidator,
  EntropyValidator,
  ShannonValidator,
  ClassesValidator,
  SequenceValidator,
  RunValidator,
  TopologyValidator,
]

/**
 * Core class for neo functionality.
 */
let _core: NeoCore

/**
 *
 */
function _registerPlugins(store: PluginStore, plugins: IPlugin[]) {
  plugins.forEach(p => store.register(p))
}

/**
 * Initialize neopass.
 */
function _init(store: PluginStore, config: INeoConfig) {
  const plugins: IPlugin[] = config.plugins || []
  _registerPlugins(store, plugins)
  return config
}

/**
 * Neopass instance.
 */
export function neopass(config?: INeoConfig|null) {
  if (!_core) {
    config = {..._defaultConfig, ...config}

    // Store registered plugins.
    const _pluginStore = new PluginStore(['validator', 'generator'])

    // Resolve strings or objects to plugins.
    const _pluginResolver = new PluginResolver(_pluginStore)

    if (config.useBuiltinGenerators) {
      _registerPlugins(_pluginStore, _builtinGenerators.map(G => new G()))
    }

    if (config.useBuiltinValidators) {
      _registerPlugins(_pluginStore, _builtinValidators.map(V => new V()))
    }

    // Give init an opportunity to modify the config.
    let _config = _init(_pluginStore, config)

    // Create the neopass core instance.
    _core = new NeoCore(_config, _pluginStore, _pluginResolver)
  }

  return neopass
}

/**
 * Generate a password using the given generator reference.
 */
function generate(len: number, generator: PluginInfo): string {
  return _core.generate(len, generator)
}

neopass.generate = generate

/**
 *
 */
function evaluate(password: string, evaluators?: IEvaluator[]): PasswordStrength {
  return _core.evaluate(password, evaluators)
}

neopass.evaluate = evaluate

/**
 * Run a validation chain against a password.
 */
function validate(password: string, validators?: PluginInfo[]): IValidatorError[] {
  return _core.validate(password, validators)
}

neopass.validate = validate

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

/**
 *
 */
neopass.middleware = {
  password: function (template?: string) {
    return (req: any, res: any) => {
      res.render(template)
    }
  },

  generate: function (generators: any[]) {
    return (req: any, res: any, next: () => void) => {
      next()
    }
  },

  validate: function () {
    return (req: any, res: any, next: () => void) => {
      next()
    }
  },

  evaluate: function () {
    return (req: any, res: any, next: () => void) => {
      next()
    }
  }
}
