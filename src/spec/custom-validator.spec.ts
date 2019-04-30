import assert from 'assert'
import { NeoPass } from '../neo-pass'

/**
 * Create a configurable custom validator function.
 */
function customDepth(min: number) {
  const msg = 'not enough character depth'
  return () => {
    // Create a validator object.
    const validator = {
      // Request depth from password info.
      request: ['depth'],
      // The core validator function.
      exec(depth: number) {
        if (depth < min) {
          // Validation failure.
          const score = depth / min
          return [{name: 'custom-depth', msg, score}]
        }
      }
    }
    // Return the validator object.
    return validator
  }
}

const neo = new NeoPass({
  validators: [
    customDepth(62)
  ],
})

describe('CustomValidator', () => {
  it('fails on insufficient depth', () => {
    const errors = neo.validate('abcdefg')
    const [{name, msg}] = errors

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(name, 'custom-depth')
    assert.strictEqual(msg, 'not enough character depth')
  })

  it('passes on sufficient depth', () => {
    const errors = neo.validate('Abc10')

    assert.strictEqual(errors.length, 0)
  })

  it('throws if no fn on options', () => {
    assert.throws(() => {
      neo.validate('abc', [ { plugin: 'custom' }])
    })
  })
})
