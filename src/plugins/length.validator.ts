import { ValidatorPlugin, IValidator } from '../validator'

export class LengthValidator extends ValidatorPlugin {

  get name(): string {
    return 'length'
  }

  message(min: number, max: number): string {
    return `password length should be between ${min} and ${max} characters, inclusive`
  }

  configure(options: any): IValidator {
    const { min, max } = options

    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new Error('length validator needs min and max options')
    }

    const validator: IValidator = {
      request: ['length'],
      exec: (length: number) => {
        if (length < min || length > max) {
          const msg = this.message(min, max)

          if (length < min) {
            const score = length / min
            return [{ name: this.name, msg, score, meta: 'min' }]
          }

          return [{ name: this.name, msg, score: 0, meta: 'max' }]
        }
      }
    }

    return validator
  }
}
