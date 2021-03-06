import { IValidator, ValidatorPlugin } from '../validator'
import { typeOf } from '../utils/type-of'
import { KeyVals } from '../types'

const _standardPatterns = [
  /^l+$/,         // l
  /^u+$/,         // u
  /^d+$/,         // d

  /^l+d+$/,       // ld
  /^d+l+$/,       // dl
  /^u+d+$/,       // ud
  /^d+u+$/,       // du
  /^u+l+$/,       // ul
  /^l+u+$/,       // lu

  /^u+l+d+$/,     // uld
  /^u+d+l+$/,     // udl
  /^l+u+d+$/,     // lud
  /^l+d+u+$/,     // ldu
  /^d+l+u+$/,     // dlu
  /^d+u+l+$/,     // dul

  /^l+d+l+$/,     // ldl
  /^l+u+l+$/,     // lul
  /^u+d+u+$/,     // udu
  /^u+l+u+$/,     // ulu
  /^d+l+d+$/,     // dld
  /^d+u+d+$/,     // dud

  /^u+s+$/,       // us
  /^l+s+$/,       // ls
  /^d+s+$/,       // ds

  /^u+l+s+$/,     // uls
  /^u+d+s+$/,     // uds
  /^l+d+s+$/,     // lds
  /^l+s+d+$/,     // lsd

  /^u+l+d+s+$/,     // ulds
  // /^u+l+u+l+s+$/,   // ululs
  // /^u+l+u+l+d+$/,   // ululd
  // /^u+l+u+l+d+s+$/, // ululds
]

interface IBitsInfo {
  entropy: number
  shannon: number
}

export class TopologyValidator extends ValidatorPlugin {

  get name(): string {
    return 'topology'
  }

  get msg(): string {
    return 'password matches vulnerable pattern topology'
  }

  /**
   * Allow bypassing of topology check if entropy/shannon is high enough.
   */
  bypass(actual: IBitsInfo, requested: IBitsInfo): boolean {
    if (typeof requested.entropy === 'number' && typeof requested.shannon === 'number') {
      return actual.entropy >= requested.entropy && actual.shannon >= requested.shannon
    }

    if (typeof requested.entropy === 'number') {
      return actual.entropy >= requested.entropy
    }

    if (typeof requested.shannon === 'number') {
      return actual.shannon >= requested.shannon
    }

    return false
  }

  /**
   * Get a list of topology expression patterns.
   */
  patterns(options: any): RegExp[] {
    let { patterns = [] } = options

    // Patterns must be an array.
    if (!Array.isArray(patterns)) {
      throw new Error(`unrecognized pattern type "${patterns}"`)
    }

    // Include standard patterns.
    if (options.standard === true) {
      patterns = _standardPatterns.concat(patterns)
    }

    // At least one pattern must be specified.
    if (patterns.length === 0) {
      throw new Error('no patterns provided')
    }

    // Map string patterns to regular expressions.
    const expr = patterns.map((pattern: any) => {
      if (typeof pattern === 'string') {
        return new RegExp(pattern)
      }

      if (typeOf(pattern) !== 'RegExp') {
        throw new Error(`pattern ${pattern} is not a RegExp or string`)
      }

      return pattern
    })

    return expr
  }

  /**
   * Return true if the topology matches a pattern.
   */
  topologyMatch(topology: string, expr: RegExp[]): boolean {
    return expr.reduce((match, p) => match || p.test(topology), false as boolean)
  }

  /**
   * Validator pattern.
   */
  configure(options: KeyVals = {}): IValidator {
    const patterns: RegExp[] = this.patterns(options)

    const validator: IValidator = {
      request: ['topology', 'entropy', 'shannon', 'length'],
      exec: (topology: string, entropy: number, shannon: number, length: number) => {
        // Calculate bits for entire string.
        const actual: IBitsInfo = {
          entropy: length * entropy,
          shannon: length * shannon,
        }

        // Check if we should bypass the topology validation.
        if (this.bypass(actual, <IBitsInfo>options)) {
          return null
        }

        // Check if we have a topology pattern match.
        if (this.topologyMatch(topology, patterns)) {
          return [{ name: this.name, msg: this.msg }]
        }
      }
    }

    return validator
  }
}
