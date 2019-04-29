export type PluginType = 'validator'|'generator'

export interface IPlugin<T = any> {
  type: PluginType
  name: string
  configure: (...args: any[]) => T
}
