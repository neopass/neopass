import { IPlugin, PluginType } from '../plugin'
import { IValidator } from '../validator'

export class ShannonValidator implements IPlugin<IValidator> {

  get type(): PluginType {
    return 'validator'
  }

  get name() {
    return 'shannon'
  }

  get message() {
    return `password is too simple`
  }

  fn(options: any, min: number): IValidator {

    if (typeof min !== 'number') {
      throw new Error('entropy validator requires a single argument')
    }

    const name = this.name
    const message = this.message

    const validator: IValidator = {
      request: ['length', 'shannon'],
      validate(length: number, shannon: number) {
        const bits = length * shannon
        if (bits < min) {
          return [{ name, message }]
        }
        return []
      }
    }

    return validator
  }
}
