import { IPlugin, PluginType } from '../plugin'
import { IValidator } from '../validator'

export class EntropyValidator implements IPlugin<IValidator> {

  get type(): PluginType {
    return 'validator'
  }

  get name() {
    return 'entropy'
  }

  get message() {
    return `password is either too short or not complex enough`
  }

  fn(options: any, min: number): IValidator {

    if (typeof min !== 'number') {
      throw new Error('entropy validator requires a single argument')
    }

    const name = this.name
    const message = this.message

    const validator: IValidator = {
      request: ['length', 'entropy'],
      validate(length: number, entropy: number) {
        const bits = length * entropy
        if (bits < min) {
          const score = bits / min
          return [{ name, message, score }]
        }
        return []
      }
    }

    return validator
  }
}
