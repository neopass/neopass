import { PluginType } from '../plugin'
import { DetectorPlugin, IDetector } from '../detector'

export class PassphraseDetector extends DetectorPlugin {

  get type(): PluginType {
    return 'detector'
  }

  get name(): string {
    return 'passphrase'
  }

  configure(options: any, min: number): IDetector {
    if (typeof min !== 'number') {
      throw new Error('passphrase detector needs a min argument')
    }

    const validator: IDetector = {
      request: ['length'],
      exec(length: number) {
        return length >= min
      }
    }

    return validator
  }
}
