
import { Generate, GeneratorPlugin } from '../generator'
import { generate as _generate } from '../utils/generate'
import { classes } from '../topology'
import { PluginType } from '../plugin'

const { u, l, d } = classes('uld')

export class LettersNumbersGenerator extends GeneratorPlugin {
  public fn: (options: any) => Generate

  constructor() {
    const _classes = [u, l, d]

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
    return 'letters-numbers'
  }

  get title(): string {
    return 'Letters & Numbers'
  }
}
