import { IPlugin, PluginType } from './plugin'
import { KeyVals } from './types'

export type Generate = (len: number) => string
export type GenUnits = 'char'|'byte'|'word'

export interface IGenerator extends IPlugin<Generate> {
  readonly title: string
  readonly units: GenUnits
  configure(options?: KeyVals, ...args: any[]): Generate
}

export abstract class GeneratorPlugin implements IGenerator {
  public abstract name: string
  public abstract title: string
  public abstract units: GenUnits
  public abstract configure(options?: KeyVals, ...args: any[]): Generate
  public get type(): PluginType { return 'generator' }
}

export type Generator = new () => GeneratorPlugin
