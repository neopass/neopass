import { NeoCore } from './core/neo-core'
import { IBaseConfig } from './core/base-config'
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

  constructor(config?: IBaseConfig, generators?: Generator[], validators?: Validator[], detectors?: Detector[]) {
    const store = new PluginStore(['validator', 'generator', 'detector'])
    const resolver = new PluginResolver(store)

    config = config || {}

    super(config, store, resolver)

    if (Array.isArray(generators)) {
      _registerPlugins(store, generators.map(G => new G()))
    }

    if (Array.isArray(validators)) {
      _registerPlugins(store, validators.map(V => new V()))
    }

    if (Array.isArray(detectors)) {
      _registerPlugins(store, detectors.map(D => new D()))
    }

    const plugins: IPlugin[] = config.plugins || []
    _registerPlugins(store, plugins)
  }
}
