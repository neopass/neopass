import { IValidator, ValidatorPlugin, IValidatorError } from '../validator'

export class DepthValidator extends ValidatorPlugin {

  get name(): string {
    return 'depth'
  }

  get message(): string {
    return `password needs more class complexity (uppercase, lowercase, digit, special)`
  }

  configure(options: any, min: number): IValidator {

    if (typeof min !== 'number') {
      throw new Error('depth validator requires a single numeric argument')
    }

    const name = this.name
    const msg = this.message

    const validator: IValidator = {
      request: ['depth'],
      exec(depth: number): IValidatorError[] {
        if (depth < min) {
          const score = depth / min
          return [{ name, msg, score }]
        }
        return []
      }
    }

    return validator
  }
}
