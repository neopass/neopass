import { IGeneratorInfo } from './generator-info'
import { IPlugin } from './plugin'

export type Generator = (len: number) => string

export interface IGenerator extends IPlugin<Generator> {
  readonly title: string
  readonly info?: IGeneratorInfo|null
  readonly fn: (options: any) => Generator
}
