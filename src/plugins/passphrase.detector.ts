import { IDetector, DetectorPlugin } from '../detector'
import { KeyVals } from '../types'

export class PassphraseDetector extends DetectorPlugin {

  get name(): string {
    return 'passphrase'
  }

  configure(options: KeyVals, min: number): IDetector {
    if (typeof min !== 'number') {
      throw new Error('passphrase detector needs a min argument')
    }

    const validator: IDetector = {
      request: ['length'],
      exec(length: number): boolean {
        return length >= min
      }
    }

    return validator
  }
}
