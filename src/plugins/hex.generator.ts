
import { Generate, GeneratorPlugin, GenUnits,  } from '../generator'
import { randomIn } from '../utils'

export class HexGenerator extends GeneratorPlugin {
  constructor() {
    super()
  }

  get name(): string {
    return 'hex'
  }

  get title(): string {
    return 'Hexidecimal'
  }

  get units(): GenUnits {
    return 'byte'
  }

  configure(options: any): Generate {
    return function generate(bytes: number) {
      const hex: string[] = []
      for (let i = 0; i < bytes; i++) {
        hex.push(randomIn(0, 256).toString(16))
      }
      return hex.join('')
    }
  }
}
