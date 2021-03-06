import { IValidator, ValidatorPlugin } from '../validator'
import regexEach from 'regex-each'
import { KeyVals } from '../types'

export class SequenceValidator extends ValidatorPlugin {

  get name(): string {
    return 'sequence'
  }

  message(num: number): string {
    return `password contains at least ${num} character sequence(s)`
  }

  sequences(min: number, pass: string): number {
    const expr = String.raw`([a-z]{${min},})|([0-9]{${min},})`
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

        if (inSequence + 1 >= min) {
          offending += 1
          inSequence = 0
        }
      }
    })

    return offending
  }

  configure(options: KeyVals, min: number): IValidator {
    if (typeof min !== 'number') {
      throw new Error('sequence validator needs a min argument')
    }

    const validator: IValidator = {
      request: ['password'],
      exec: (password: string) => {
        const offending = this.sequences(min, password)
        if (offending > 0) {
          const msg = this.message(offending)
          return [{ name: this.name, msg, meta: offending }]
        }
      }
    }

    return validator
  }
}
