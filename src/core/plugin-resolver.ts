import { PluginStore } from './plugin-store'
import { PluginType } from '../plugin'
import regexEach from 'regex-each'
import { IPluginInfo, PluginInfo } from '../plugin-info'

const tChar = String.raw`[^,:=]`
const tPlugin = String.raw`${tChar}+(?= *:|$)`
const tKeyVal = String.raw`${tChar}+=${tChar}+`
const tParser = String.raw`^(${tPlugin})| *(?:,|:) *(${tKeyVal})| *(?:,|:) *(${tChar}+)`
const parser = new RegExp(tParser, 'yi')

/**
 * Try to parse a string as a json value.
 */
function parseJson(str: string): string {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

/**
 * Parse a plugin reference into name, options, and arguments.
 */
function parsePluginRef(str: string): IPluginInfo {
  const info: any = { plugin: '', args: [], options: {} }

  let lastIndex = 0
  regexEach(parser, str, (match, expr) => {
    const [, plugin, keyval, val] = match

    if (plugin != null) {
      info.plugin = plugin
    }

    if (keyval != null) {
      const [key, val] = keyval.split('=')
      info.options[key] = parseJson(val)
    }

    if (val != null) {
      info.args.push(parseJson(val))
    }

    lastIndex = expr.lastIndex
  })

  if (lastIndex < str.length) {
    throw new Error(`could not parse plugin string "${str}"`)
  }

  return <IPluginInfo>info
}

/**
 * Resolve a plugin definition (string, function, IPluginInfo)
 * to an actual plugin.
 *
 * If the given value is a function, it is expected to conform
 * to IPlugin<T>. If it is a string or an IPluginInfo, get the plugin
 * from the plugin store.
 */
export class PluginResolver {
  public resolve: <T = any>(type: PluginType, value: PluginInfo<T>) => T

  constructor(_store: PluginStore) {
    this.resolve = function resolve(type: PluginType, value: PluginInfo) {
      /**
       * If the value is a function, expect it to be an IPlugin<T>.
       */
      if (typeof value === 'function') {
        return value()
      }

      let plugin: string
      let args: any[]
      let options: any

      /**
       * If the value is a string, parse it into an IPluginInfo.
       */
      if (typeof value === 'string') {
        const info = parsePluginRef(value)
        plugin = info.plugin
        args = <any[]>info.args
        options = info.options

      /**
       * Assume the value is already an IPluginInfo.
       */
      } else {
        plugin = value.plugin
        args = value.args || []
        options = value.options != null ? value.options : {}

        if (typeof plugin !== 'string') {
          throw new Error(`cannot resolve plugin "${value}"`)
        }

        if (value.args != null && !Array.isArray(args)) {
          throw new Error('args must be an array')
        }
      }

      // Fetch the plugin from the store.
      const _plugin = _store.get(type, plugin)
      // Call the plugin's configure method, passing in options and args.
      return _plugin.configure(options, ...args)
    }
  }
}
