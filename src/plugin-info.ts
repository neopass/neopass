
export interface IPluginInfo {
  readonly plugin: string
  readonly args?: any[]
  readonly options?: {readonly [key: string]: any}
}

type CustomPlugin<T> = () => T
export type PluginInfo<T = any> = string|IPluginInfo|CustomPlugin<T>
