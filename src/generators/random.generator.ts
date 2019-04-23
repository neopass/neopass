
import { IGenerator, Generator } from '../generator'
import { generate as _generate } from '../utils/generate'
import { pullFromClass } from '../utils/pull'
import { classes } from '../topology'
import { PluginType } from '../plugin'

const { u, l, d, s } = classes('ulds')

export class RandomGenerator implements IGenerator {
  public fn: (options: any) => Generator

  constructor() {
    // Pull the space character from the 'special' class.
    const special = pullFromClass(s, 0x20)
    const _classes = [u, l, d, special]

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
    return 'random'
  }

  get title() {
    return 'Random'
  }
}
