import { PluginType } from '../plugin'
import { IValidator, ValidatorPlugin } from '../validator'

export class ShannonValidator extends ValidatorPlugin {

  get type(): PluginType {
    return 'validator'
  }

  get name(): string {
    return 'shannon'
  }

  get message(): string {
    return `password is too simple`
  }

  fn(options: any, min: number): IValidator {

    if (typeof min !== 'number') {
      throw new Error('shannon validator requires a single argument')
    }

    const name = this.name
    const msg = this.message

    const validator: IValidator = {
      request: ['length', 'shannon'],
      validate(length: number, shannon: number) {
        const bits = length * shannon
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
