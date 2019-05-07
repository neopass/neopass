import assert from 'assert'
import { NeoPass } from '../src/neo-pass'

/**
 * Create a configurable custom validator function.
 */
function customDepth(min: number) {
  const msg = 'not enough character depth'

  return () => {
    const validator = {
      request: ['depth'],
      exec(depth: number) {
        if (depth < min) {
          const score = depth / min
          return [{name: 'custom-depth', msg, score}]
        }
      }
    }
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

  it('works with validate override', () => {
    const errors = neo.validate('abcdefg', [customDepth(62)])
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
