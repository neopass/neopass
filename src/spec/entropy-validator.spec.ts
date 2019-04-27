import assert from 'assert'
import { NeoPass } from '../neo-pass'
import { EntropyValidator } from '../plugins'

const neo = new NeoPass({
  plugins: [ new EntropyValidator() ],
  validators: [ 'entropy:64' ],
  evaluators: [
    {
      weight: 0.5,
      validators: [
        'entropy:64',
      ]
    }
  ]
})

describe('EntropyValidator', () => {
  it('generates error when entropy threshold not met', () => {
    const errors = neo.validate('abcdefg')
    const [{name, score=-1}] = errors

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(name, 'entropy')
  })

  it('errors out if wrong argument type given', () => {
    assert.throws(() => {
      neo.validate('abcdedg', ['entropy'])
    })

    assert.throws(() => {
      neo.validate('abcdefg', ['entropy:true'])
    })
  })

  it('passes if sufficient classes present', () => {
    const errors = neo.validate('Abcdefg1$$$')
    assert.strictEqual(errors.length, 0)
  })

  it('works with evaluation chain', () => {
    let result = neo.evaluate('Abcdefg1$$$')
    var {strength = -1} = result

    assert.strictEqual(strength, 1)

    result = neo.evaluate('abc')
    var {strength = -1, warnings} = result
    const {score = -1} = warnings[0]

    assert.strictEqual(warnings.length, 1)
    assert.notStrictEqual(strength, -1)
    assert.notStrictEqual(score, -1)
    assert.strictEqual(0.5 * score, strength)
  })
})
