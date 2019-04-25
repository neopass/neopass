
import { Generate, GeneratorPlugin } from '../generator'
import { generate as _generate } from '../utils/generate'
import { pullFromClass } from '../utils/pull'
import { classes } from '../topology'
import { PluginType } from '../plugin'

const { u, l, d, s } = classes('ulds')

export class RandomGenerator extends GeneratorPlugin {
  public fn: (options: any) => Generate

  constructor() {
    // Pull the space character from the 'special' class.
    const special = pullFromClass(s, 0x20)
    const _classes = [u, l, d, special]

    super()

    this.fn = function fn(options: any): Generate {
      return function generate(len: number) {
        return _generate(len, _classes)
      }
    }
  }

  get type(): PluginType {
    return 'generator'
  }

  get name(): string {
    return 'random'
  }

  get title(): string {
    return 'Random'
  }
}
