import { IPlugin, PluginType } from '../plugin'
import { IValidator } from '../validator'

export class LengthValidator implements IPlugin<IValidator> {

  get type(): PluginType {
    return 'validator'
  }

  get name() {
    return 'length'
  }

  fn(options: any): IValidator {
    const min = options.min
    const max = options.max

    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new Error('length validator needs min and max options')
    }

    const name = this.name

    const validator: IValidator = {
      request: ['length'],
      validate(length: number) {
        if (length < min || length > max) {
          const message = `password length should be between ${min} and ${max} characters, inclusive`
          return [{ name, message }]
        }
        return []
      }
    }

    return validator
  }
}
