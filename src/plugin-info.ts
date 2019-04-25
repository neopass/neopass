
export interface IPluginInfo {
  readonly plugin: string
  readonly args?: any[]
  readonly options?: {readonly [key: string]: any}
}

export type PluginInfo = string|IPluginInfo
