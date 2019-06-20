import { IValidator, ValidatorPlugin } from '../validator'
import { KeyVals } from '../types'

export class CommonValidator extends ValidatorPlugin {

  get name(): string {
    return 'common'
  }

  get msg(): string {
    return 'password found in a common vulnerable password list'
  }

  /**
   * Validator pattern.
   */
  configure(options: KeyVals = {}): IValidator {
    const set: Set<string> = new Set(options.list || [])

    if (set.size === 0) {
      throw new Error('common passwords list is empty')
    }

    const validator: IValidator = {
      request: ['password'],
      exec: (password: string) => {
        if (set.has(password)) {
          return [{ name: this.name, msg: this.msg }]
        }
      }
    }

    return validator
  }
}
