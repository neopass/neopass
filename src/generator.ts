import { IPlugin, PluginType } from './plugin'

export type Generate = (len: number) => string

export interface IGenerator extends IPlugin<Generate> {
  readonly title: string
  fn(options: any): Generate
}

export abstract class GeneratorPlugin implements IGenerator {
  public abstract type: PluginType
  public abstract name: string
  public abstract title: string
  public abstract fn(options: any): Generate
}

export type Generator = new () => GeneratorPlugin
