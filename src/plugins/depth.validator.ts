import { IPlugin, PluginType } from '../plugin'
import { IValidator } from '../validator'

export class DepthValidator implements IPlugin<IValidator> {

  get type(): PluginType {
    return 'validator'
  }

  get name() {
    return 'depth'
  }

  fn(options: any, min: number): IValidator {

    if (typeof min !== 'number') {
      throw new Error('depth validator requires a single argument')
    }

    const name = this.name

    const validator: IValidator = {
      request: ['depth'],
      validate(depth: number) {
        if (depth < min) {
          const message = `password needs more class complexity (uppercase, lowercase, digit, special)`
          return [{ name, message }]
        }
        return []
      }
    }

    return validator
  }
}
