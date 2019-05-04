import assert from 'assert'
import { NeoPass } from '../src/neo-pass'
import { TopologyValidator } from '../src/plugins'

const neo = new NeoPass({
  plugins: [ new TopologyValidator() ],
  validators: [ 'topology:standard=true,entropy=64,shannon=32' ],
  evaluators: [
    {
      weight: 0.5,
      validators: [
        'topology:standard=true',
      ]
    }
  ]
})

describe('TopologyValidator', () => {
  it('generates error when topology detected', () => {
    const errors = neo.validate('abcdefg')
    const [{name}] = errors

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(name, 'topology')
  })

  it('errors out if wrong argument type given', () => {
    assert.throws(() => {
      neo.validate('abcdedg', ['topology'])
    })

    assert.throws(() => {
      neo.validate('abcdedg', ['topology:patterns=true'])
    })
  })

  it('passes if no topologies detected', () => {
    const errors = neo.validate('a.a')
    assert.strictEqual(errors.length, 0)
  })

  it('bypasses check if shannon/entropy threshold is met', () => {
    const errors = neo.validate('Denver2016!')
    assert.strictEqual(errors.length, 0)
  })

  it('errors if patterns includes non string element', () => {
    assert.throws(() => {
      neo.validate('abc', [
        {
          plugin: 'topology',
          options: { patterns: ['^u+l+u+l+d+s+', true] }
        }
      ])
    })
  })

  it('bypasses on entropy alone', () => {
    const errors = neo.validate('abcdefghijklmn', [
      'topology:standard=true, entropy=64'
    ])

    assert.strictEqual(errors.length, 0)
  })

  it('bypasses on shannon alone', () => {
    const errors = neo.validate('abcdefghij', [
      'topology:standard=true, shannon=32'
    ])

    assert.strictEqual(errors.length, 0)
  })

  it('errors if no patterns provided', () => {
    assert.throws(() => {
      neo.validate('abcdefghij', ['topology'])
    })
  })

  it('works with evaluation chain', () => {
    let result = neo.evaluate('AaBb')
    var {strength = -1} = result
    assert.strictEqual(strength, 1)

    result = neo.evaluate('abc')
    var {strength = -1, warnings} = result

    assert.strictEqual(warnings.length, 1)
    assert.notStrictEqual(strength, -1)
  })
})
