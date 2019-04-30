import assert from 'assert'
import { copyRange, copyClass, copySet } from '../src/utils/copy'
import { Range, CharClass, CharSet } from '../src/types'

describe('copy', () => {
  it('copies a range', () => {
    const r1: Range = [0, 9]
    const r2 = copyRange(r1)

    assert.notStrictEqual(r1, r2)
    assert.deepStrictEqual(r1, r2)
  })

  it('copies a class', () => {
    const c1: CharClass = [[65, 90], [97, 122]]
    const c2 = copyClass(c1)

    assert.notStrictEqual(c1, c2)
    assert.deepStrictEqual(c1, c2)
  })

  it('copies a set', () => {
    const s1: CharSet = [[[65, 90], [97, 122]], [[33, 47], [58, 64], [91, 96], [123, 126]]]
    const s2 = copySet(s1)

    assert.notStrictEqual(s1, s2)
    assert.deepStrictEqual(s1, s2)
  })
})
