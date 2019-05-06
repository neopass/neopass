import assert from 'assert'
import { NeoPass } from '../src/neo-pass'
import { RunValidator } from '../src/plugins'

const neo = new NeoPass({
  plugins: [ new RunValidator() ],
  validators: [ 'run:3' ],
  evaluators: [
    {
      weight: 0.5,
      validators: [
        'run:3'
      ]
    }
  ]
})

describe('RunValidator', () => {
  it('generates error when run threshold is met', () => {
    const errors = neo.validate('abcccdefffg')
    assert.strictEqual(errors.length, 1)

    const [{name}] = errors
    assert.strictEqual(name, 'run')
  })

  it('errors out if wrong argument type given', () => {
    assert.throws(() => {
      neo.validate('abcdefg', ['run'])
    })

    assert.throws(() => {
      neo.validate('abcdefg', ['run:true'])
    })
  })

  it('passes if no runs detected', () => {
    const errors = neo.validate('Abcd3fg$')
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
