import { IValidator, ValidatorPlugin, IValidatorError } from '../validator'

export class ShannonValidator extends ValidatorPlugin<IValidatorError[]> {

  get name(): string {
    return 'shannon'
  }

  message(): string {
    return `password is too simple`
  }

  configure(options: any, min: number): IValidator {

    if (typeof min !== 'number') {
      throw new Error('shannon validator requires a single argument')
    }

    const name = this.name
    const message = this.message

    const validator: IValidator = {
      request: ['length', 'shannon'],
      exec(length: number, shannon: number) {
        const bits = length * shannon
        if (bits < min) {
          const score = bits / min
          return [{ name, msg: message(), score }]
        }
      }
    }

    return validator
  }
}
