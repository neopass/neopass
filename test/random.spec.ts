import assert from 'assert'

import {
  randomBit,
  randomByte,
  randomInt,
  randomUInt,
  randomFloat,
  randomIn,
  randomOf,
  pick,
  replace,
  shuffle,
} from '../src/utils'

describe('random', () => {

  it ('produces random bits', () => {
    const bits = Array(1000).fill(0).map(randomBit)
    const _true = bits.map(b => b)
    const _false = bits.map(b => !b)

    assert(_true.length > 400, `true: ${_true.length}`)
    assert(_false.length > 400, `false: ${_false.length}`)
  })

  it ('produces random bytes', () => {
    const bytes = Array(1000).fill(0).map(randomByte)
    const set = new Set(bytes)
    const inRange = bytes.filter(b => b >= 0 && b <= 255)

    assert(set.size > 200, `diverse: ${set.size}`)
    assert(inRange.length === 1000, `in range: ${inRange.length}`)
  })

  it ('produces random signed integers', () => {
    const ints = Array(1000).fill(0).map(randomInt)
    const set = new Set(ints)
    const inRange = ints.filter(i => i >= -2147483648 && i < 2147483647)

    assert(set.size > 900, `diverse: ${set.size}`)
    assert(inRange.length === 1000, `in range: ${inRange.length}`)
  })

  it ('produces random unsigned integers', () => {
    const ints = Array(1000).fill(0).map(randomUInt)
    const set = new Set(ints)
    const inRange = ints.filter(i => i >= 0 && i < 4294967296)

    assert(set.size > 900, `diverse: ${set.size}`)
    assert(inRange.length === 1000, `in range: ${inRange.length}`)
  })

  it ('produces random floats', () => {
    const floats = Array(1000).fill(0).map(randomFloat)
    const inRange = floats.filter(f => f >= 0 && f < 1)

    assert(inRange.length === 1000, `in range: ${inRange.length}`)
  })

  it ('selects a random value in a range', () => {
    const nums = Array(1000).fill(0).map(() => randomIn(0, 10))
    const set = new Set(nums)
    const inRange = nums.map(n => n >= 0 && n < 10)

    assert(set.size === 10, `diverse: ${set.size}`)
    assert(inRange.length === 1000, `in range: ${inRange.length}`)
  })

  it ('selects a random element in an array', () => {
    const nums = Array(1000).fill(0).map(() => randomOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
    const set = new Set(nums)
    const inRange = nums.map(n => n >= 0 && n < 10)

    assert(set.size === 10, `diverse: ${set.size}`)
    assert(inRange.length === 1000, `in range: ${inRange.length}`)
  })

  it ('picks random elements from an array', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const picked = pick(array, 10)

    assert(picked.length === 10, `picked: ${picked.length}`)
  })

  it ('replaces random elements in an array', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    for (let i = 0; i < 250; i++) {
      replace(array, 10)
    }

    const set = new Set(array)

    assert(set.size === 1, `replaced: ${set.size}`)
  })

  it('randomly shuffles an array', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const set = new Set<number>()

    for (let i = 0; i < 250; i++) {
      shuffle(array)
      set.add(array[0])
    }

    assert(set.size === 10, `diverse: ${set.size}`)
  })

  it('throws on bad range given to randomIn', () => {
    let error: any = null

    assert.throws(() => {
      try {
        randomIn(10, 1)
      } catch (e) {
        error = e
        throw e
      }
    })

    assert.strictEqual(error.message, 'max should be >= min')
  })

  it('throws if pick given out-of-range value', () => {
    let error: any = null

    assert.throws(() => {
      try {
        pick(['a', 'b', 'c'], 4)
      } catch (e) {
        error = e
        throw e
      }
    })

    assert.strictEqual(error.message, 'num should be in the range [0, 3]')
  })
})
