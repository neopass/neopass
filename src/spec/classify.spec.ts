import assert from 'assert'
import { classify } from '../utils/classify'

describe('classify', () => {
  it('generates a character class from a string', () => {
    const a = classify('a')
    assert.deepStrictEqual(a, [[97, 97]])

    const alpha = classify('abcdefghijklmnopqrstuvwxyz')
    assert.deepStrictEqual(alpha, [[97, 122]])

    const disjoint = classify('abcd1234!@#$')
    assert.deepStrictEqual(disjoint, [[ 33, 33 ],[ 35, 36 ],[ 49, 52 ],[ 64, 64 ],[ 97, 100 ]])
  })

  it('generates a character class from a number array', () => {
    const digit = classify([48, 49, 50, 51, 52, 53, 54, 55, 56, 57])
    assert.deepStrictEqual(digit, [[48, 57]])
  })
})
