
import { Generate, GeneratorPlugin } from '../generator'
import { generate as _generate } from '../utils/generate'
import { pullFromClass } from '../utils/pull'
import { classes as _classes } from '../topology'
import { PluginType } from '../plugin'

const { u, l, d, s } = _classes('ulds')

export class RandomGenerator extends GeneratorPlugin {
  public configure: (options: any) => Generate

  constructor() {
    // Pull the space character from the 'special' class.
    const special = pullFromClass(s, 0x20)
    const classes = [u, l, d, special]

    super()

    this.configure = function configure(options: any): Generate {
      return function generate(len: number) {
        return _generate(len, classes)
      }
    }
  }

  get name(): string {
    return 'random'
  }

  get title(): string {
    return 'Random'
  }
}
