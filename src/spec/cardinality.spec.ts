import assert from 'assert'
import { cardinality, rangeSize, classSize } from '../utils'
import { Range, CharClass, CharSet } from '../types'

describe('cardinality', () => {

  it('calculates character range size', () => {
    const range10: Range = [0, 9]
    const range100: Range = [1, 100]

    assert(rangeSize(range10) === 10, 'ten')
    assert(rangeSize(range100) === 100, 'one hundred')
  })

  it('calculates character class size', () => {
    const class10: CharClass = [[1, 1], [2, 5], [6, 10]]
    const class100: CharClass = [[1, 10], [11, 40], [41, 100]]

    assert(classSize(class10) === 10, 'ten')
    assert(classSize(class100) === 100, 'one hundred')
  })

  it ('calculates character set size', () => {
    const set10: CharSet = [[[1, 2], [3, 5]], [[6, 9], [10, 10]]]
    const set100: CharSet = [[[1, 10], [11, 30], [31, 50]], [[51, 51], [52, 75], [76, 100]]]

    assert(cardinality(set10) === 10, 'ten')
    assert(cardinality(set100) === 100, 'one hundred')
  })
})
