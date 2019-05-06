import { NeoCore } from './core/neo-core'
import { IBaseConfig } from './core/base-config'
import { PluginStore } from './core/plugin-store'
import { PluginResolver } from './core/plugin-resolver'
import { IPlugin } from './plugin'
import { Generator, IGenerator } from './generator'
import { Validator } from './validator'
import { IGeneratorInfo } from './generator-info'

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

    super(config, resolver)

    if (Array.isArray(generators)) {
      _registerPlugins(store, generators.map(G => new G()))
    }

    if (Array.isArray(validators)) {
      _registerPlugins(store, validators.map(V => new V()))
    }

    const plugins: IPlugin[] = config.plugins || []
    _registerPlugins(store, plugins)

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
}
