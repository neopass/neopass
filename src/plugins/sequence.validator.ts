import { IValidator, ValidatorPlugin, IValidatorError } from '../validator'
import regexEach from 'regex-each'

export class SequenceValidator extends ValidatorPlugin {

  get name(): string {
    return 'sequence'
  }

  message(num: number): string {
    return `password contains at least ${num} character sequence(s)`
  }

  sequences(max: number, pass: string): number {
    const num = max + 1
    const expr = String.raw`([a-z]{${num},})|([0-9]{${num},})`
    const parser = new RegExp(expr, 'gi')

    let offending = 0

    regexEach(parser, pass, (match) => {
      const candidate = (match[1] || match[2]).toLowerCase()
      const nums = Array.from(candidate).map(c => c.codePointAt(0)) as number[]

      let inSequence = 0
      for (let i = 1; i < nums.length; i++) {
        const prev = nums[i-1]
        const curr = nums[i]

        if (curr === prev + 1 || curr + 1 === prev) {
          inSequence += 1
        } else {
          inSequence = 0
        }

        if (inSequence + 1 > max) {
          offending += 1
          inSequence = 0
        }
      }
    })

    return offending
  }

  configure(options: any, max: number): IValidator {
    if (typeof max !== 'number') {
      throw new Error('sequence validator needs a max argument')
    }

    const name = this.name
    const message = this.message
    const sequences = this.sequences

    const validator: IValidator = {
      request: ['password'],
      exec(password: string) {
        const offending = sequences(max, password)
        if (offending > 0) {
          return [{ name, msg: message(offending) }]
        }
      }
    }

    return validator
  }
}
