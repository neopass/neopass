import assert from 'assert'
import { NeoPass } from '../neo-pass'
import { ClassesValidator } from '../plugins'

const neo = new NeoPass({
  plugins: [ new ClassesValidator() ],
  validators: [ 'classes:and=ul,or=ds' ],
  evaluators: [
    {
      weight: 0.5,
      validators: [
        'classes:and=ul,or=ds',
      ]
    }
  ]
})

describe('ClassesValidator', () => {
  it('generates error when classes not present', () => {
    const errors = neo.validate('abcdefg')
    const [{name}] = errors

    assert.strictEqual(errors.length, 2)
    assert.strictEqual(name, 'classes')
  })

  it('errors out if wrong argument type given', () => {
    assert.throws(() => {
      neo.validate('abcdedg', ['classes'])
    })

    assert.throws(() => {
      neo.validate('abcdefg', ['classes:and=true,or=false'])
    })
  })

  it('passes if sufficient classes present', () => {
    const errors = neo.validate('Aa1')
    assert.strictEqual(errors.length, 0)
  })

  it('works with evaluation chain', () => {
    let result = neo.evaluate('Aa1')
    var {strength = -1} = result

    assert.strictEqual(strength, 1)

    result = neo.evaluate('abc')
    var {strength = -1, warnings} = result

    assert.strictEqual(warnings.length, 2)
    assert.notStrictEqual(strength, -1)
  })
})
