import { NeoCore, IEvalCache } from './core/neo-core'
import { IBaseConfig } from './core/base-config'
import { PluginStore } from './core/plugin-store'
import { PluginResolver } from './core/plugin-resolver'
import { IPlugin } from './plugin'
import { Generator, IGenerator } from './generator'
import { Validator, IValidator } from './validator'
import { IGeneratorInfo } from './generator-info'
import { IVerifyResult } from './verify-result'
import { PluginInfo } from './plugin-info'
import { IEvaluator } from './evaluator'

/**
 * Add a list of plugins to the store.
 */
function _registerPlugins(store: PluginStore, plugins: IPlugin[]) {
  plugins.forEach(p => store.register(p))
}

/**
 * Implements the neopass interface.
 */
export class NeoPass extends NeoCore {
  /**
   * Get a list of registered generators.
   */
  public generators: () => IGeneratorInfo[]

  /**
   * @param config the configuration object
   * @param generators a list of GeneratorPlugin subclass constructors
   * @param validators a list of ValidatorPlugin subclass constructors
   */
  constructor(
    config?: null|IBaseConfig, generators?: null|Generator[], validators?: null|Validator[]
  ) {
    const store = new PluginStore(['validator', 'generator'])
    const resolver = new PluginResolver(store)

    config = config || {}

    if (Array.isArray(generators)) {
      _registerPlugins(store, generators.map(G => new G()))
    }

    if (Array.isArray(validators)) {
      _registerPlugins(store, validators.map(V => new V()))
    }

    const plugins: IPlugin[] = config.plugins || []
    _registerPlugins(store, plugins)

    // Preconfigure validators.
    const preVal = (config.validators || []).map((v) => {
      return resolver.resolve<IValidator>('validator', v)
    })

    // Preconfigure evaluator validators.
    const preEval: IEvalCache[] = (config.evaluators || []).map((e) => {
      const { weight } = e
      const validators = e.validators.map((v) => {
        return resolver.resolve<IValidator>('validator', v)
      })
      return { weight, validators }
    })

    super(config, resolver, preVal, preEval)

    /**
     *
     */
    this.generators = function generators(): IGeneratorInfo[] {
      const generators = store.getAll('generator') as IGenerator[]

      // Create a list of generator info objects.
      const infoList = generators.map((gen) => {
        const { name, title, units } = gen
        return { name, title, units }
      })

      return infoList
    }
  }

  /**
   * Run validation and evaluation to produce errors and warnings.
   *
   * @param password the password to verify
   * @param validators override configured validators
   * @param evaluators override configured evaluators
   */
  public verify(
    password: string,
    validators?: null|PluginInfo[],
    evaluators?: IEvaluator[],
  ): IVerifyResult {
    const errors = this.validate(password, validators)
    const { warnings } = this.evaluate(password, evaluators)
    const result = { errors, warnings }
    return result
  }
}
