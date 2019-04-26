export type PluginType = 'validator'|'generator'|'detector'

export interface IPlugin<T = any> {
  type: PluginType
  name: string
  fn: (...args: any[]) => T
}
