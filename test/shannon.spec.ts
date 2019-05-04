import assert from 'assert'
import { shannon } from '../src/utils'

describe('classify', () => {
  it('calculates shannon entropy for a string', () => {
    const zero = shannon('0')
    assert(zero === 0)

    const binary = shannon('01')
    assert(binary === 1)

    const octal = shannon('01234567')
    assert(octal === 3)

    const hex = shannon('0123456789abcdef')
    assert(hex === 4)

    const alpha = shannon('abcdefghijklmnopqrstuvwxyz')
    assert(alpha.toFixed(14) === 4.700439718141092.toFixed(14))
  })
})
