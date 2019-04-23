import { PluginStore } from './plugin-store'
import { PluginType } from './plugin'
import { parsePluginRef } from './utils/ref-parser'
import { IPluginInfo } from './plugin-info'

export class PluginResolver {
  public resolve: <T = any>(type: PluginType, value: string|IPluginInfo) => T

  constructor(_store: PluginStore) {
    this.resolve = function resolve(type: PluginType, value: string|IPluginInfo) {
      let plugin: string
      let options: any

      if (typeof value === 'string') {
        const info = parsePluginRef(value)
        plugin = info.plugin
        options = info.options || {}
      } else {
        plugin = value.plugin
        options = value.options || {}
      }

      if (typeof plugin !== 'string') {
        throw new Error(`cannot resolve plugin "${value}"`)
      }

      const _plugin = _store.get(type, plugin)
      return _plugin.fn(options)
    }
  }
}
