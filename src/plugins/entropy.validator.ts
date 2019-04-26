import { PluginType } from '../plugin'
import { IValidator, ValidatorPlugin } from '../validator'

export class EntropyValidator extends ValidatorPlugin {

  get type(): PluginType {
    return 'validator'
  }

  get name(): string {
    return 'entropy'
  }

  get message(): string {
    return `password is either too short or not complex enough`
  }

  configure(options: any, min: number): IValidator {

    if (typeof min !== 'number') {
      throw new Error('entropy validator requires a single argument')
    }

    const name = this.name
    const msg = this.message

    const validator: IValidator = {
      request: ['length', 'entropy'],
      exec(length: number, entropy: number) {
        const bits = length * entropy
        if (bits < min) {
          const score = bits / min
          return [{ name, msg, score }]
        }
        return []
      }
    }

    return validator
  }
}
