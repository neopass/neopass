import { NeoCore } from './core/neo-core'
import { INeoConfig } from './neo-config'
import { PluginStore } from './core/plugin-store'
import { PluginResolver } from './core/plugin-resolver'
import { IPlugin } from './plugin'
import { Generator } from './generator'
import { Validator } from './validator'

/**
 *
 */
function _registerPlugins(store: PluginStore, plugins: IPlugin[]) {
  plugins.forEach(p => store.register(p))
}

export class NeoPass extends NeoCore {

  constructor(config: INeoConfig, generators: Generator[], validators: Validator[]) {
    const store = new PluginStore(['validator', 'generator'])
    const resolver = new PluginResolver(store)

    super(config, store, resolver)

    if (config.useBuiltinGenerators) {
      _registerPlugins(store, generators.map(G => new G()))
    }

    if (config.useBuiltinValidators) {
      _registerPlugins(store, validators.map(V => new V()))
    }

    const plugins: IPlugin[] = config.plugins || []
    _registerPlugins(store, plugins)
  }
}
