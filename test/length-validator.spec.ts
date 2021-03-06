import assert from 'assert'
import { NeoPass } from '../src/neo-pass'
import { LengthValidator } from '../src/plugins'
import { expandRange } from '../src/utils'

const neo = new NeoPass({
  plugins: [ new LengthValidator() ],
  validators: [ 'length:min=10,max=72' ],
  evaluators: [
    {
      weight: 0.5,
      validators: [
        'length:min=10,max=72',
      ]
    }
  ]
})

describe('LengthValidator', () => {
  it('generates error when min length is not met', () => {
    const errors = neo.validate('abcdefg')
    const [{name, score = -1, meta}] = errors

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(name, 'length')
    assert.strictEqual(meta, 'min')
    assert.strictEqual(score > 0 && score < 1, true)
  })

  it('generates error when max length exceeded', () => {
    const pass = expandRange([32, 126])
      .map(n => String.fromCodePoint(n))
      .join('')

    const errors = neo.validate(pass)
    const [{name, score = -1, meta}] = errors

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(name, 'length')
    assert.strictEqual(meta, 'max')
    assert.strictEqual(score, 0)
  })

  it('errors out if wrong argument type given', () => {
    assert.throws(() => {
      neo.validate('abcdedg', ['length'])
    })

    assert.throws(() => {
      neo.validate('abcdefg', ['length:min=true,max=false'])
    })
  })

  it('passes if sufficient length detected', () => {
    const errors = neo.validate('abcdefghij')
    assert.strictEqual(errors.length, 0)
  })

  it('works with evaluation chain', () => {
    let result = neo.evaluate('abcdefghij')
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
