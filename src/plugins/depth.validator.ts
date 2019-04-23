import { IPlugin, PluginType } from '../plugin'
import { IValidator } from '../validator'

export class DepthValidator implements IPlugin<IValidator> {

  get type(): PluginType {
    return 'validator'
  }

  get name() {
    return 'depth'
  }

  get message() {
    return `password needs more class complexity (uppercase, lowercase, digit, special)`
  }

  fn(options: any, min: number): IValidator {

    if (typeof min !== 'number') {
      throw new Error('depth validator requires a single argument')
    }

    const name = this.name
    const message = this.message

    const validator: IValidator = {
      request: ['depth'],
      validate(depth: number) {
        if (depth < min) {
          const score = depth / min
          return [{ name, message, score }]
        }
        return []
      }
    }

    return validator
  }
}
