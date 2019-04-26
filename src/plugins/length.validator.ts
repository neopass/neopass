import { PluginType } from '../plugin'
import { ValidatorPlugin, IValidator } from '../validator'

export class LengthValidator extends ValidatorPlugin {

  get type(): PluginType {
    return 'validator'
  }

  get name(): string {
    return 'length'
  }

  message(min: number, max: number): string {
    return `password length should be between ${min} and ${max} characters, inclusive`
  }

  fn(options: any): IValidator {
    const min = options.min
    const max = options.max

    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new Error('length validator needs min and max options')
    }

    const name = this.name
    const message = this.message

    const validator: IValidator = {
      request: ['length'],
      exec(length: number) {
        if (length < min || length > max) {
          const score = length / min
          const meta = length < min ? 'min' : length > max ? 'max' : undefined
          return [{ name, msg: message(min, max), score, meta }]
        }
        return []
      }
    }

    return validator
  }
}
