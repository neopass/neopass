import { NeoCore } from './core/neo-core'
import { INeoConfig } from './neo-config'
import { PluginStore } from './core/plugin-store'
import { PluginResolver } from './core/plugin-resolver'
import { IPlugin } from './plugin'
import { Generator } from './generator'
import { Validator } from './validator'
import { Detector } from './detector'

/**
 *
 */
function _registerPlugins(store: PluginStore, plugins: IPlugin[]) {
  plugins.forEach(p => store.register(p))
}

export class NeoPass extends NeoCore {

  constructor(config: INeoConfig, generators?: Generator[], validators?: Validator[], detectors?: Detector[]) {
    const store = new PluginStore(['validator', 'generator', 'detector'])
    const resolver = new PluginResolver(store)

    super(config, store, resolver)

    if (config.useBuiltinGenerators) {
      if (Array.isArray(generators)) {
        _registerPlugins(store, generators.map(G => new G()))
      }
    }

    if (config.useBuiltinValidators) {
      if (Array.isArray(validators)) {
        _registerPlugins(store, validators.map(V => new V()))
      }
    }

    if (config.useBuiltinDetectors) {
      if (Array.isArray(detectors)) {
        _registerPlugins(store, detectors.map(D => new D()))
      }
    }

    const plugins: IPlugin[] = config.plugins || []
    _registerPlugins(store, plugins)
  }
}
