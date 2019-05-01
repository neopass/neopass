import { IPlugin, PluginType } from './plugin'

export type Generate = (len: number) => string
export type GenUnits = 'char'|'byte'

export interface IGenerator extends IPlugin<Generate> {
  readonly title: string
  readonly units: GenUnits
  configure(options: any): Generate
}

export abstract class GeneratorPlugin implements IGenerator {
  public abstract name: string
  public abstract title: string
  public abstract units: GenUnits
  public abstract configure(options: any): Generate
  public get type(): PluginType { return 'generator' }
}

export type Generator = new () => GeneratorPlugin
