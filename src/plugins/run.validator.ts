import { IValidator, ValidatorPlugin, IValidatorError } from '../validator'
import regexEach from 'regex-each'

export class RunValidator extends ValidatorPlugin {

  get name(): string {
    return 'run'
  }

  message(num: number): string {
    return `password contains at least ${num} character run(s)`
  }

  runs(max: number, pass: string): number {
    const num = max + 1
    const expr = String.raw`([a-z]{${num},})|([0-9]{${num},})`
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

        if (run + 1 > max) {
          offending += 1
          run = 0
        }
      }
    })

    return offending
  }

  configure(options: any, max: number): IValidator {
    if (typeof max !== 'number') {
      throw new Error('run validator needs a max argument')
    }

    const validator: IValidator = {
      request: ['password'],
      exec: (password: string) => {
        const offending = this.runs(max, password)
        if (offending > 0) {
          const msg = this.message(offending)
          return [{ name: this.name, msg }]
        }
      }
    }

    return validator
  }
}
