
import { Generate, GeneratorPlugin, GenUnits } from '../generator'
import { generate as _generate } from '../utils/generate'
import { classes } from '../topology'

const { u, l, d } = classes('uld')

export class LettersNumbersGenerator extends GeneratorPlugin {
  public configure: (options: any) => Generate

  constructor() {
    const _classes = [u, l, d]

    super()

    this.configure = function configure(options: any): Generate {
      return function generate(len: number) {
        return _generate(len, _classes)
      }
    }
  }

  get name(): string {
    return 'letters-numbers'
  }

  get title(): string {
    return 'Letters & Numbers'
  }

  get units(): GenUnits {
    return 'char'
  }
}
