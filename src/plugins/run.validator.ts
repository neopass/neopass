import { IValidator, ValidatorPlugin, IValidatorError } from '../validator'
import regexEach from 'regex-each'
import { KeyVals } from '../types'

export class RunValidator extends ValidatorPlugin {

  get name(): string {
    return 'run'
  }

  message(num: number): string {
    return `password contains at least ${num} character run(s)`
  }

  runs(min: number, pass: string): number {
    const expr = String.raw`([a-z]{${min},})|([0-9]{${min},})`
    const parser = new RegExp(expr, 'gi')

    let offending = 0
    regexEach(parser, pass, (match) => {
      const candidate = match[1] || match[2]
      const chars = Array.from(candidate)

      let run = 0
      for (let i = 1; i < chars.length; i++) {
        const prev = chars[i-1]
        const curr = chars[i]

        if (curr === prev) {
          run += 1
        } else {
          run = 0
        }

        if (run + 1 >= min) {
          offending += 1
          run = 0
        }
      }
    })

    return offending
  }

  configure(options: KeyVals, min: number): IValidator {
    if (typeof min !== 'number') {
      throw new Error('run validator needs a min argument')
    }

    const validator: IValidator = {
      request: ['password'],
      exec: (password: string) => {
        const offending = this.runs(min, password)
        if (offending > 0) {
          const msg = this.message(offending)
          return [{ name: this.name, msg, meta: offending }]
        }
      }
    }

    return validator
  }
}
