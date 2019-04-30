import { PluginStore } from './plugin-store'
import { PluginType } from '../plugin'
import regexEach from 'regex-each'
import { IPluginInfo } from '../plugin-info'

const tChar = String.raw`[^ ,:=]`
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
    const [,plugin, keyval, val] = match

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

export class PluginResolver {
  public resolve: <T = any>(type: PluginType, value: string|IPluginInfo) => T

  constructor(_store: PluginStore) {
    this.resolve = function resolve(type: PluginType, value: string|IPluginInfo) {
      let plugin: string
      let args: any
      let options: any

      if (typeof value === 'string') {
        const info = parsePluginRef(value)
        plugin = info.plugin
        args = info.args
        options = info.options
      } else {
        plugin = value.plugin
        args = value.args || []
        options = value.options || {}
      }

      if (typeof plugin !== 'string') {
        throw new Error(`cannot resolve plugin "${value}"`)
      }

      const _plugin = _store.get(type, plugin)
      return _plugin.configure(options, ...args)
    }
  }
}
