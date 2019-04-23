
import { IGenerator, Generator } from '../generator'
import { generate as _generate } from '../utils/generate'
import { CharClass } from '../types'
import { classes } from '../topology'
import { PluginType } from '../plugin'

const { u, l, d } = classes('uld')

export class LettersNumbersGenerator implements IGenerator {
  public fn: (options: any) => Generator

  constructor() {
    const _classes = [u, l, d]

    this.fn = function fn(options: any): Generator {
      return function generate(len: number) {
        return _generate(len, _classes)
      }
    }
  }

  get type(): PluginType {
    return 'generator'
  }

  get name() {
    return 'letters-numbers'
  }

  get title() {
    return 'Letters & Numbers'
  }
}
