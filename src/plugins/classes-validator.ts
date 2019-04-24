import { IPlugin, PluginType } from '../plugin'
import { IValidator, IValidatorError } from '../validator'
import { toTopoChars } from '../topology'
import { TopoChar } from '../types'

const topoNames = new Map<TopoChar, string>([
  ['u', 'uppercase'],
  ['l', 'lowercase'],
  ['d', 'digit'],
  ['s', 'special'],
])

export class ClassesValidator implements IPlugin<IValidator> {

  get type(): PluginType {
    return 'validator'
  }

  get name() {
    return 'classes'
  }

  // get message() {
  //   return `password characters do not contain enough variety`
  // }

  fn(options: any): IValidator {
    const and = options.and
    const or = options.or

    if (typeof and !== 'string' && typeof or !== 'string') {
      throw new Error('no "and" or "or" classes specified')
    }

    const name = this.name

    const validator: IValidator = {
      request: ['classes'],
      validate(classes: string) {
        const errors: IValidatorError[] = []

        if (typeof and === 'string') {
          // Get a list character classes.
          const topoChars = toTopoChars(and)

          topoChars.forEach(c => {
            const re = new RegExp(c)

            if (!re.test(classes)) {
              // const message = <string>topoMap.get(c)
              const msg = `missing ${topoNames.get(c)} character`
              errors.push({ name, msg, meta: c })
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
            const message = `missing one of ${names.join(', ')}`
            errors.push({ name, msg: message, meta: or })
          }
        }

        return errors
      }
    }

    return validator
  }
}
