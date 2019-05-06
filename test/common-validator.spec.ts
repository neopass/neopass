import assert from 'assert'
import { NeoPass } from '../src/neo-pass'
import { CommonValidator } from '../src/plugins'

const neo = new NeoPass({
  plugins: [ new CommonValidator() ],
  validators: [
    {
      plugin: 'common',
      options: { list: [ '0123456789', 'password', 'superman' ] }
    }
  ],
  evaluators: [
    {
      weight: 0.5,
      validators: [
        {
          plugin: 'common',
          options: { list: [ '0123456789', 'password', 'superman' ] }
        }
      ]
    }
  ]
})

describe('CommonValidator', () => {
  it('generates error when common password detected', () => {
    const errors = neo.validate('superman')
    const [{name}] = errors

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(name, 'common')
  })

  it('errors out if password list is empty', () => {
    assert.throws(() => {
      neo.validate('abcdedg', ['common'])
    })
  })

  it('passes if no common password detected', () => {
    const errors = neo.validate('$up3rm4n')
    assert.strictEqual(errors.length, 0)
  })

  it('works with evaluation chain', () => {
    let result = neo.evaluate('p4ssw0rd')
    var {strength = -1} = result
    assert.strictEqual(strength, 1)

    result = neo.evaluate('password')
    var {strength = -1, warnings} = result

    assert.strictEqual(warnings.length, 1)
    assert.strictEqual(strength, 0.5)
  })
})
