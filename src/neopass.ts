import { IPlugin } from './plugin'
import { PluginStore } from './plugin-store'
import { PluginResolver } from './plugin-resolver'
import { IValidator, IValidatorError } from './validator'
import { IGenerator, Generator } from './generator'
import { IPluginInfo } from './plugin-info'
import { passwordInfo } from './password-info'
import { runValidator } from './helpers/run-validator'
import { LengthValidator } from './plugins/length-validator'
import { RandomGenerator } from './generators/random.generator'
import { LettersNumbersGenerator } from './generators/letters-numbers.generator'
import passTemplate from './views/password-template.html'

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
const defaultConfig: INeoConfig = {
  useBuiltinGenerators: true,
  useBuiltinValidators: true,
}

// Store registered plugins.
const _pluginStore = new PluginStore(['validator', 'generator'])

// Resolve strings or objects to plugins.
const _pluginResolver = new PluginResolver(_pluginStore)

// Built-in generators.
const _builtinGenerators = [
  new RandomGenerator(),
  new LettersNumbersGenerator(),
]

// Built-in validators.
const _builtinValidators = [
  new LengthValidator()
]

/**
 *
 */
function registerPlugins(plugins: IPlugin[]) {
  plugins.forEach(p => _pluginStore.register(p))
}

/**
 * Initialize neopass.
 */
function init(config?: INeoConfig|null) {
  if (config != null) {
    const plugins: IPlugin[] = config.plugins || []
    registerPlugins(plugins)
    return true
  }

  return false
}

/**
 * Only initialize once.
 */
let _initialized = false

/**
 * Neopass instance.
 */
function neopass(config?: INeoConfig|null) {

  if (!_initialized) {
    const _config = {...defaultConfig, ...config}

    if (_config.useBuiltinGenerators) {
      registerPlugins(_builtinGenerators)
    }

    if (_config.useBuiltinValidators) {
      registerPlugins(_builtinValidators)
    }

    _initialized = init(_config)
  }

  return neopass
}

/**
 * Generate a password using the given generator reference.
 */
neopass.generate = function generate(len: number, generator: string|IPluginInfo): string {
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
  validators: (string|IPluginInfo)[]
): IValidatorError[] {
  // Get the password info object.
  const info = passwordInfo(password)

  // Map supplied validator references to plugins.
  const _validators = validators.map(validator =>
    _pluginResolver.resolve<IValidator>('validator', validator))

  /**
   * Get a list of validation errors by executing all
   * validators against the password and password info.
   */
  const errors = _validators.reduce((errList, validator) => {
    const _errors = runValidator(validator, password, info)
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
  }
}

export default neopass
