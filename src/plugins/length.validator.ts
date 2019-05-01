import { ValidatorPlugin, IValidator } from '../validator'

export class LengthValidator extends ValidatorPlugin {

  get name(): string {
    return 'length'
  }

  message(min: number, max: number): string {
    return `password length should be between ${min} and ${max} characters, inclusive`
  }

  configure(options: any): IValidator {
    const min = options.min
    const max = options.max

    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new Error('length validator needs min and max options')
    }

    const validator: IValidator = {
      request: ['length'],
      exec: (length: number) => {
        if (length < min || length > max) {
          let score = length / min
          if (score > 1) { score = 0 }
          const meta = length < min ? 'min' : 'max'
          const msg = this.message(min, max)
          return [{ name: this.name, msg, score, meta }]
        }
      }
    }

    return validator
  }
}
