import { PluginType } from '../plugin'
import { IValidator, ValidatorPlugin } from '../validator'
import regexEach from 'regex-each'

export class RunValidator extends ValidatorPlugin {

  get type(): PluginType {
    return 'validator'
  }

  get name(): string {
    return 'run'
  }

  message(num: number): string {
    return `password contains at least ${num} character run(s)`
  }

  run(max: number, pass: string): string[] {
    const num = max + 1
    const expr = String.raw`([a-z]{${num},})|([0-9]{${num},})`
    const parser = new RegExp(expr, 'gi')

    let offending: string[] = []

    regexEach(parser, pass, (match) => {
      const candidate = match[1] || match[2]
      const chars = Array.from(candidate)

      let runs = 0
      for (let i = 1; i < chars.length; i++) {
        const prev = chars[i-1]
        const curr = chars[i]

        if (curr === prev) {
          runs += 1
        }
      }

      if (runs + 1 > max) {
        offending.push(candidate)
      }
    })

    return offending
  }

  fn(options: any, max: number): IValidator {
    if (typeof max !== 'number') {
      throw new Error('run validator needs a max argument')
    }

    const name = this.name
    const message = this.message
    const run = this.run

    const validator: IValidator = {
      request: ['password'],
      validate(password: string) {
        const offending = run(max, password)
        if (offending.length > 0) {
          return [{ name, message: message(offending.length) }]
        }
        return []
      }
    }

    return validator
  }
}
