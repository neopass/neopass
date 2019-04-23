import { IPlugin, PluginType } from './plugin'

type PluginMap = Map<string, IPlugin>

export class PluginStore {
  public register: (plugin: IPlugin, force?: boolean) => void
  public getAll: <T = any>(type: PluginType) => IPlugin<T>[]
  public get: <T = any>(type: PluginType, name: string) => IPlugin<T>

  constructor(types: PluginType[]) {
    const _plugins = new Map<PluginType, PluginMap>()
    const _types = new Set(types)

    /**
     *
     */
    this.register = function register(plugin: IPlugin) {
      // Check that this plugin type exists and that the id is a string.
      if (!_types.has(plugin.type)) {
        throw new Error(`unrecognized plugin type "${plugin.type}"`)
      }

      if (typeof plugin.name !== 'string') {
        throw new Error('plugin name must be a string')
      }

      // Get the plugins for the requested type.
      const pMap = _plugins.get(plugin.type) || new Map()

      // Get the existing plugin by name (if any).
      const existing = pMap.get(plugin.name)

      // Check that the plugin isn't already registered.
      if (existing == null) {
        pMap.set(plugin.name, plugin)
      } else {
        throw new Error(`plugin "${plugin.name}" already registered`)
      }

      // Update the plugins map.
      _plugins.set(plugin.type, pMap)
    }

    /**
     *
     */
    this.getAll = function getAll(type: PluginType) {
      const map = _plugins.get(type)

      if (map == null) {
        return []
      }

      return [...map.values()]
    }

    /**
     *
     */
    this.get = function get(type: PluginType, name: string) {
      const map = _plugins.get(type)

      if (map == null) {
        throw new Error(`no ${type} plugins registered`)
      }

      const plugin = map.get(name)

      if (plugin == null) {
        throw new Error(`plugin "${name}" not registered for type "${type}"`)
      }

      return plugin
    }
  }
}
