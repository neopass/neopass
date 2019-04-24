import { IPlugin } from './plugin'
import { PluginStore } from './plugin-store'
import { PluginResolver } from './plugin-resolver'
import { IValidator, IValidatorError } from './validator'
import { IGenerator, Generator } from './generator'
import { IPluginInfo } from './plugin-info'
import { passwordInfo } from './password-info'
import { runValidator } from './helpers/run-validator'

// Plugins
import { RandomGenerator } from './plugins/random.generator'
import { LettersNumbersGenerator } from './plugins/letters-numbers.generator'
import { LengthValidator } from './plugins/length.validator'
import { DepthValidator } from './plugins/depth.validator'
import { EntropyValidator } from './plugins/entropy.validator'
import { ShannonValidator } from './plugins/shannon.validator'
import { ClassesValidator } from './plugins/classes-validator'
import { SequenceValidator } from './plugins/sequence.validator'
import { RunValidator } from './plugins/run.validator'
import { TopologyValidator } from './plugins/topology.validator'

type PluginInfo = string|IPluginInfo

// Neopass configuration interface.
export interface INeoConfig {
  useBuiltinGenerators?: boolean
  useBuiltinValidators?: boolean
  plugins?: IPlugin[]
}

// Information about a registered generator.
export interface IGeneratorInfo {
  name: string
  title: string
}

// Create a default configuration.
const _defaultConfig: INeoConfig = {
  useBuiltinGenerators: true,
  useBuiltinValidators: true,
}

// Store registered plugins.
const _pluginStore = new PluginStore(['validator', 'generator'])

// Resolve strings or objects to plugins.
const _pluginResolver = new PluginResolver(_pluginStore)

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
 * Global configuration object.
 */
let _configuration: INeoConfig

/**
 *
 */
function _registerPlugins(plugins: IPlugin[]) {
  plugins.forEach(p => _pluginStore.register(p))
}

/**
 * Initialize neopass.
 */
function _init(config: INeoConfig) {
  const plugins: IPlugin[] = config.plugins || []
  _registerPlugins(plugins)
  return config
}

/**
 * Neopass instance.
 */
export function neopass(config?: INeoConfig|null) {
  if (!_configuration) {
    const _config = {..._defaultConfig, ...config}

    if (_config.useBuiltinGenerators) {
      _registerPlugins(_builtinGenerators.map(G => new G()))
    }

    if (_config.useBuiltinValidators) {
      _registerPlugins(_builtinValidators.map(V => new V()))
    }

    _configuration = _init(_config)
  }

  return neopass
}

/**
 * Generate a password using the given generator reference.
 */
neopass.generate = function generate(len: number, generator: PluginInfo): string {
  const _generate = _pluginResolver.resolve<Generator>('generator', generator)
  return _generate(len)
}

/**
 *
 */
neopass.evaluate = function evaluate(password: string): any {
  return null
}

/**
 * Run a validation chain against a password.
 */
neopass.validate = function validate(
  password: string,
  validators: PluginInfo[]
): IValidatorError[] {
  // Map supplied validator references to plugins.
  const _validators = validators.map(validator =>
    _pluginResolver.resolve<IValidator>('validator', validator))

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
 * Get a list of registered generators.
 */
neopass.generators = function generators(): IGeneratorInfo[] {
  const generators = <IGenerator[]>_pluginStore.getAll('generator')

  // Create a list of generator info objects.
  const infoList = generators.map((gen) => {
    return { name: gen.name, title: gen.title }
  })

  return infoList
}

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
  ]
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
