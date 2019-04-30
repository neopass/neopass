import { IValidator, ValidatorPlugin, IValidatorError } from '../validator'

export class CustomValidator extends ValidatorPlugin {
  get name(): string { return 'custom' }

  configure(options: any): IValidator {
    const fn = options.exec

    if (typeof fn !== 'function') {
      throw new Error(`the custom validator requres that options.exec is a function`)
    }

    const validator: IValidator = {
      request: [ 'password', 'topology', 'classes',
        'depth', 'length', 'entropy', 'shannon'],

      // The validation logic.
      exec(password: string, topology: string, classes: string,
        depth: number, length: number, entropy: number, shannon: number
      ): IValidatorError[] {
        // Create an info object.
        const info = {
          password, topology, classes, depth, length, entropy, shannon }

        /**
         * Should return at least [{name, msg}] if there is an error
         * and [] if not.
         */
        return fn(info)
      }
    }

    return validator
  }
}
