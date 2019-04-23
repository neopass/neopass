
export interface IPluginInfo {
  readonly plugin: string
  args: any[]
  readonly options: {readonly [key: string]: any}
}
