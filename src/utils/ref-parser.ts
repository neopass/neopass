import regexEach from 'regex-each'
import { parseJson } from './ parse-json'
import { IPluginInfo } from '../plugin-info'

const tDecimal = String.raw`(?:\d+(?:\.\d*)?|\.\d+)`
const tSign = String.raw`(?:\+|-)`
const tNumber = String.raw`${tSign}?${tDecimal}(?:[eE]${tSign}?\d+)?`
const tChar = String.raw`[a-z0-9_-]`
const tPlugin = String.raw`${tChar}+(?=:|$)`
const tNamedArg = String.raw`${tChar}+=(?:${tNumber}|${tChar}+)`
// const tArg = String.raw`${tChar}+`
const tParser = String.raw`^(${tPlugin})|:(${tNamedArg})`
// const tParser = String.raw`^(${tPlugin})|:(${tNamedArg})|:(${tArg})`
const parser = new RegExp(tParser, 'yi')

export function parsePluginRef(str: string): IPluginInfo {
  const info: any = { plugin: '', /* args: [], */ options: {} }

  let lastIndex = 0
  regexEach(parser, str, (match, expr) => {
    const [,plugin, keyval/* , val */] = match

    if (plugin != null) {
      info.plugin = plugin
    }

    if (keyval != null) {
      const [key, val] = keyval.split('=')
      info.options[key] = parseJson(val)
    }

    // if (val != null) {
    //   info.args.push(parseJson(val))
    // }

    lastIndex = expr.lastIndex
  })

  if (lastIndex < str.length) {
    throw new Error(`could not parse plugin string "${str}"`)
  }

  return <IPluginInfo>info
}
