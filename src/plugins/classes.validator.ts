import { IValidator, IValidatorError, ValidatorPlugin } from '../validator'
import { toTopoChars } from '../topology'
import { TopoChar, KeyVals } from '../types'

const topoNames = new Map<TopoChar, string>([
  ['u', 'uppercase'],
  ['l', 'lowercase'],
  ['d', 'digit'],
  ['s', 'special'],
])

export class ClassesValidator extends ValidatorPlugin {
  get name(): string {
    return 'classes'
  }

  andMsg(cls: string): string {
    return `missing ${cls} character`
  }

  orMsg(classes: string[]): string {
    return `missing one of ${classes.join(', ')}`
  }

  configure(options: KeyVals = {}): IValidator {
    const { and, or } = options

    if (typeof and !== 'string' && typeof or !== 'string') {
      throw new Error('no "and" or "or" classes specified')
    }

    const validator: IValidator = {
      request: ['classes'],
      exec: (classes: string) => {
        const errors: IValidatorError[] = []

        if (typeof and === 'string') {
          // Get a list character classes.
          const topoChars = toTopoChars(and)

          // Determine if all the 'and' classes are present.
          topoChars.forEach(c => {
            const re = new RegExp(c)
            // Test if the class is present.
            if (!re.test(classes)) {
              const msg = this.andMsg(<string>topoNames.get(c))
              errors.push({ name: this.name, msg, meta: c })
            }
          })
        }

        if (typeof or === 'string') {
          // Get a list character classes.
          const topoChars = toTopoChars(or)

          // Determine if at least one 'or' class is present.
          const passed = topoChars.reduce((pass, c) => {
            const re = new RegExp(c)
            return pass || re.test(classes)
          }, false)

          if (!passed) {
            const names = topoChars.map(c => topoNames.get(c))
            const msg = this.orMsg(<string[]>names)
            errors.push({ name: this.name, msg, meta: or })
          }
        }

        return errors
      }
    }

    return validator
  }
}
