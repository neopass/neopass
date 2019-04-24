import { IPlugin, PluginType } from '../plugin'
import { IValidator } from '../validator'
import regexEach from 'regex-each'

export class SequenceValidator implements IPlugin<IValidator> {

  get type(): PluginType {
    return 'validator'
  }

  get name() {
    return 'sequence'
  }

  message(num: number) {
    return `password contains at least ${num} character sequence(s)`
  }

  inSequence(max: number, pass: string): string[] {
    const num = max + 1
    const expr = String.raw`([a-z]{${num},})|([0-9]{${num},})`
    const parser = new RegExp(expr, 'gi')

    let offending: string[] = []

    regexEach(parser, pass, (match) => {
      const candidate = match[1] || match[2]
      const nums = Array.from(candidate).map(c => c.codePointAt(0)) as number[]

      let inSequence = 0
      for (let i = 1; i < nums.length; i++) {
        const prev = nums[i-1]
        const curr = nums[i]

        if (curr === prev + 1 || curr + 1 === prev) {
          inSequence += 1
        }
      }

      if (inSequence + 1 > max) {
        offending.push(candidate)
      }
    })

    return offending
  }

  fn(options: any, max: number): IValidator {
    if (typeof max !== 'number') {
      throw new Error('sequence validator needs a max argument')
    }

    const name = this.name
    const message = this.message
    const inSequence = this.inSequence

    const validator: IValidator = {
      request: ['password'],
      validate(password: string) {
        const offending = inSequence(max, password)
        if (offending.length > 0) {
          return [{ name, message: message(offending.length) }]
        }
        return []
      }
    }

    return validator
  }
}
