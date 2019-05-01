import assert from 'assert'
import { expandRange, expandClass, expandSet, toChars } from '../src/utils'

describe('expand', () => {
  it('converts a range into a string', () => {
    const nums = expandRange([97, 99])
    assert.strictEqual(toChars(nums).join(''), 'abc')
  })

  it('converts a class into a string', () => {
    const nums = expandClass([[97, 99], [49, 51]])
    assert.strictEqual(toChars(nums).join(''), 'abc123')
  })

  it('converts a set into a string', () => {
    const nums = expandSet([[[97, 99], [100, 102]], [[49, 49], [50, 51]], [[91, 93]]])
    assert.strictEqual(toChars(nums).join(''), 'abcdef123[\\]')
  })

  it('throws if range too large', () => {
    assert.throws(() => {
      expandRange([0, 10000])
    })
  })
})
