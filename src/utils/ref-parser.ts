import regexEach from 'regex-each'
import { parseJson } from './ parse-json'
import { IPluginInfo } from '../plugin-info'

const tChar = String.raw`[^ ,:=]`
const tPlugin = String.raw`${tChar}+(?= *:|$)`
const tKeyVal = String.raw`${tChar}+=${tChar}+`
const tParser = String.raw`^(${tPlugin})| *(?:,|:) *(${tKeyVal})| *(?:,|:) *(${tChar}+)`
const parser = new RegExp(tParser, 'yi')

/**
 * Parse a plugin reference into name, options, and arguments.
 */
export function parsePluginRef(str: string): IPluginInfo {
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
