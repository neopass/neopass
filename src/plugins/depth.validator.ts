import { IValidator, ValidatorPlugin } from '../validator'
import { KeyVals } from '../types'

export class DepthValidator extends ValidatorPlugin {

  get name(): string {
    return 'depth'
  }

  get msg(): string {
    return `password needs more class complexity (uppercase, lowercase, digit, special)`
  }

  configure(options: KeyVals, min: number): IValidator {
    if (typeof min !== 'number') {
      throw new Error('depth validator requires a single numeric argument')
    }

    const validator: IValidator = {
      request: ['depth'],
      exec: (depth: number) => {
        if (depth < min) {
          const score = depth / min
          return [{ name: this.name, msg: this.msg, score }]
        }
      }
    }

    return validator
  }
}
