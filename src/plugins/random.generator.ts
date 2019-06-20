
import { Generate, GeneratorPlugin, GenUnits } from '../generator'
import { generate as _generate } from '../utils/generate'
import { pullFromClass } from '../utils/pull'
import { classes as _classes } from '../topology'

const { u, l, d, s } = _classes('ulds')

export class RandomGenerator extends GeneratorPlugin {
  public configure: (options: any) => Generate

  constructor() {
    // Pull the space character from the 'special' class.
    const special = pullFromClass(s, 0x20)
    const classes = [u, l, d, special]

    super()

    this.configure = function configure(): Generate {
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

  get units(): GenUnits {
    return 'char'
  }
}
