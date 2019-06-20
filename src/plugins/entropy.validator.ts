import { IValidator, ValidatorPlugin } from '../validator'
import { KeyVals } from '../types'

export class EntropyValidator extends ValidatorPlugin {

  get name(): string {
    return 'entropy'
  }

  get msg(): string {
    return `password is either too short or not complex enough`
  }

  configure(options: KeyVals, min: number): IValidator {
    if (typeof min !== 'number') {
      throw new Error('entropy validator requires a single argument')
    }

    const validator: IValidator = {
      request: ['length', 'entropy'],
      exec: (length: number, entropy: number) => {
        const bits = length * entropy
        if (bits < min) {
          const score = bits / min
          return [{ name: this.name, msg: this.msg, score }]
        }
      }
    }

    return validator
  }
}
