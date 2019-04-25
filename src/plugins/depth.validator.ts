import { PluginType } from '../plugin'
import { IValidator, ValidatorPlugin } from '../validator'

export class DepthValidator extends ValidatorPlugin {

  get type(): PluginType {
    return 'validator'
  }

  get name(): string {
    return 'depth'
  }

  get message(): string {
    return `password needs more class complexity (uppercase, lowercase, digit, special)`
  }

  fn(options: any, min: number): IValidator {

    if (typeof min !== 'number') {
      throw new Error('depth validator requires a single argument')
    }

    const name = this.name
    const msg = this.message

    const validator: IValidator = {
      request: ['depth'],
      validate(depth: number) {
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
