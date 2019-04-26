import assert from 'assert'
import { probabilities } from '../utils'
import { classList } from '../topology'
import { cardinality, rangeSize, concatAll } from '../utils'
import { RangeData, Range, CharClass, CharSet } from '../types'

describe('probabilities', () => {

  it('calculates character set probabilities', () => {
    let prob: RangeData[]

    const charset1 = classList('ulds')
    prob = probabilities(charset1)
    const total = prob.reduce((sum, data) => sum + data[0], 0)
    assert(total === 1)

    const carset2: CharSet = [[[1, 10], [11, 20]], [[21, 30], [31, 40]]]
    const size = cardinality(carset2)
    const ranges: Range[] = concatAll(carset2)
    const rangeData = ranges.map(range => [rangeSize(range) / size, range])

    prob = probabilities(carset2)
    assert.deepStrictEqual(probabilities(carset2), rangeData)
  })
})
