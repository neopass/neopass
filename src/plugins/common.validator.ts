import { IValidator, ValidatorPlugin } from '../validator'

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
  configure(options: any): IValidator {
    const set: Set<string> = new Set(options.list || [])

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