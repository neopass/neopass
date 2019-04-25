import { IPlugin } from './plugin'

export type Generator = (len: number) => string

export interface IGenerator extends IPlugin<Generator> {
  readonly title: string
  readonly fn: (options: any) => Generator
}
