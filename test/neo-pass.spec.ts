import assert from 'assert'
import { NeoPass, ValidatorPlugin, shannon, INeoConfig } from '../src'

import {
  RandomGenerator,
  LettersNumbersGenerator,
  ShannonValidator,
} from '../src/plugins'

class BadValidator extends ValidatorPlugin {
  get name() { return 'bad' }

  configure(): any {
    return {
      request: [],
      // exec() { return [] }
    }
  }
}

describe('NeoPass', () => {
  it('can run without a config', () => {
    const neo = new NeoPass(null, [RandomGenerator], [ShannonValidator])
    const errors = neo.validate('Shannon', ['shannon:32'])
    const [{name, score = -1}] = errors

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(name, 'shannon')
    assert.strictEqual(score > 0 && score < 1, true)
  })

  it('throws if validator not configured properly', () => {
    const neo = new NeoPass(null, [], [BadValidator])
    assert.throws(() => {
      neo.validate('lala', ['bad'])
    })
  })

  it('words with null or zero retries', () => {
    const neo = new NeoPass(null, [LettersNumbersGenerator])
    const pass = neo.generate(16, 'letters-numbers', 0)
    assert.strictEqual(pass.length, 16)
  })

  it('throws if evaluation attempted without evaluators', () => {
    const neo = new NeoPass()

    let error: any = null

    assert.throws(() => {
      try {
        neo.evaluate('abcdefg')
      } catch (e) {
        error = e
        throw e
      }
    })

    assert.strictEqual(error.message, 'no evaluators specified')
  })

  it('throws if validation attempted without validators', () => {
    const neo = new NeoPass()

    let error: any = null

    assert.throws(() => {
      try {
        neo.validate('abcdefg')
      } catch (e) {
        error = e
        throw e
      }
    })

    assert.strictEqual(error.message, 'no validators specified')
  })

  it('throws on parse error', () => {
    const neo = new NeoPass(null, null, [ShannonValidator])

    let error: any = null

    assert.throws(() => {
      try {
        neo.validate('abcdefg', ['shannon::'])
      } catch (e) {
        error = e
        throw e
      }
    })

    assert.strictEqual(error.message, 'could not parse plugin string "shannon::"')
  })

  it('throws on misconfigured plugin info', () => {
    const neo = new NeoPass()

    let error: any = null

    assert.throws(() => {
      try {
        neo.validate('abcdefg', [
          { plugin: 0, args: [], options: {} } as any
        ])
      } catch (e) {
        error = e
        throw e
      }
    })

    assert(error instanceof Error)
    assert.strictEqual(error.message, 'cannot resolve plugin "[object Object]"')

    assert.throws(() => {
      try {
        neo.validate('abcdefg', [
          { plugin: '', args: 1, options: {} } as any
        ])
      } catch (e) {
        error = e
        throw e
      }
    })

    assert(error instanceof Error)
    assert.strictEqual(error.message, 'args must be an array')
  })

  it('throws if registering a nonexistent plugin type', () => {
    const config: any = {
      plugins: [{ type: 'nonexistent', name: '' }]
    }

    let error: any = null

    assert.throws(() => {
      try {
        new NeoPass(config, null, null)
      } catch (e) {
        error = e
        throw e
      }
    })

    assert(error instanceof Error)
    assert.strictEqual(error.message, 'unrecognized plugin type "nonexistent"')
  })

  it('throws if registering a misconfigured plugin', () => {
    const config: any = {
      plugins: [{ type: 'validator', name: 1 }]
    }

    let error: any = null

    assert.throws(() => {
      try {
        new NeoPass(config, null, null)
      } catch (e) {
        error = e
        throw e
      }
    })

    assert(error instanceof Error)
    assert.strictEqual(error.message, 'plugin name must be a string')
  })

  it('throws if registering a plugin twice', () => {
    const config: any = {
      plugins: [new ShannonValidator(), new ShannonValidator()]
    }

    let error: any = null

    assert.throws(() => {
      try {
        new NeoPass(config, null, null)
      } catch (e) {
        error = e
        throw e
      }
    })

    assert(error instanceof Error)
    assert.strictEqual(error.message, 'plugin "shannon" already registered')
  })

  it('throws if using an unregistered plugin', () => {
    const neo = new NeoPass(null, null, [ShannonValidator])

    let error: any = null

    assert.throws(() => {
      try {
        neo.validate('abcdefg', ['unregistered'])
      } catch (e) {
        error = e
        throw e
      }
    })

    assert(error instanceof Error)
    assert.strictEqual(error.message, 'plugin "unregistered" not registered for type "validator"')
  })

  it('returns empty array when no generators registered', () => {
    const neo = new NeoPass()
    const gens = neo.generators()
    assert.strictEqual(gens.length, 0)
  })
})
