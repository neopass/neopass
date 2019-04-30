import assert from 'assert'
import { NeoPass } from '../neo-pass'
import { SequenceValidator } from '../plugins'

const neo = new NeoPass({
  plugins: [ new SequenceValidator() ],
  validators: [ 'sequence:3' ],
  evaluators: [
    {
      weight: 0.5,
      validators: [
        'sequence:3'
      ]
    }
  ]
})

describe('SequenceValidator', () => {
  it('generates error when sequence threshold is exceeded', () => {
    let errors = neo.validate('abcd')
    const [error] = errors

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(error.name, 'sequence')

    errors = neo.validate('1234')
    assert.strictEqual(errors.length, 1)
    assert.strictEqual(error.name, 'sequence')
  })

  it('errors out if wrong argument type given', () => {
    assert.throws(() => {
      neo.validate('abcdefg', ['sequence'])
    })

    assert.throws(() => {
      neo.validate('abcdefg', ['sequence:true'])
    })
  })

  it('passes if no sequences detected', () => {
    const errors = neo.validate('abcefg')
    assert.strictEqual(errors.length, 0)
  })

  it('works with evaluation chain', () => {
    let result = neo.evaluate('123')
    var {strength = -1} = result

    assert.strictEqual(strength, 1)

    result = neo.evaluate('abcccdefff')
    var {strength = -1, warnings} = result

    assert.strictEqual(warnings.length, 1)
    assert.strictEqual(strength, 0.5)
  })
})
