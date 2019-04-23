import { IPlugin, PluginType } from '../plugin'
import { IValidator } from '../validator'

export class EntropyValidator implements IPlugin<IValidator> {

  get type(): PluginType {
    return 'validator'
  }

  get name() {
    return 'entropy'
  }

  fn(options: any, min: number): IValidator {

    if (typeof min !== 'number') {
      throw new Error('entropy validator requires a single argument')
    }

    const name = this.name

    const validator: IValidator = {
      request: ['length', 'entropy'],
      validate(length: number, entropy: number) {
        const _entropy = length * entropy
        console.log(_entropy)
        if (_entropy < min) {
          const message = `password is either too short or not complex enough`
          return [{ name, message }]
        }
        return []
      }
    }

    return validator
  }
}
