import assert from 'assert'
import { expandRange, expandClass, expand } from '../src/utils'

describe('expand', () => {
  it('converts a range into a string', () => {
    const chars = expandRange([97, 99])
    assert.strictEqual(chars.join(''), 'abc')
  })

  it('converts a class into a string', () => {
    const chars = expandClass([[97, 99], [49, 51]])
    assert.strictEqual(chars.join(''), 'abc123')
  })

  it('converts a set into a string', () => {
    const chars = expand([[[97, 99], [100, 102]], [[49, 49], [50, 51]], [[91, 93]]])
    assert.strictEqual(chars.join(''), 'abcdef123[\\]')
  })

  it('throws if range too large', () => {
    assert.throws(() => {
      expandRange([0, 10000])
    })
  })
})
