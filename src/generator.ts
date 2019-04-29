import { IPlugin, PluginType } from './plugin'

export type Generate = (len: number) => string

export interface IGenerator extends IPlugin<Generate> {
  readonly title: string
  configure(options: any): Generate
}

export abstract class GeneratorPlugin implements IGenerator {
  public abstract name: string
  public abstract title: string
  public abstract configure(options: any): Generate
  public get type(): PluginType { return 'generator' }
}

export type Generator = new () => GeneratorPlugin
