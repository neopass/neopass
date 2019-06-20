import { IValidator, ValidatorPlugin, IValidatorError } from '../validator'
import { KeyVals } from '../types'

export class ShannonValidator extends ValidatorPlugin<IValidatorError[]> {

  get name(): string {
    return 'shannon'
  }

  get msg(): string {
    return `password is too simple`
  }

  configure(options: KeyVals, min: number): IValidator {
    if (typeof min !== 'number') {
      throw new Error('shannon validator requires a single argument')
    }

    const validator: IValidator = {
      request: ['length', 'shannon'],
      exec: (length: number, shannon: number) => {
        const bits = length * shannon
        if (bits < min) {
          const score = bits / min
          return [{ name: this.name, msg: this.msg, score }]
        }
      }
    }

    return validator
  }
}
