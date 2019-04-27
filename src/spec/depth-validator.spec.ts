import assert from 'assert'
import { NeoPass } from '../neo-pass'
import { DepthValidator } from '../plugins';

const neo = new NeoPass({
  plugins: [ new DepthValidator() ],
  validators: [ 'depth:95' ],
  evaluators: [
    {
      weight: 1.0,
      validators: [
        'depth:95'
      ]
    }
  ]
})

describe('DepthValidator', () => {
  it('generates error when depth threshhold is not met', () => {
    const errors = neo.validate('abcdefg')
    const [{name, score = -1}] = errors

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(name, 'depth')
    assert.strictEqual(score > 0, true)
  })

  it('errors out if wrong argument type given', () => {
    assert.throws(() => {
      neo.validate('abcdedg', ['depth'])
    })

    assert.throws(() => {
      neo.validate('abcdefg', ['depth:true'])
    })
  })

  it('passes if sufficient depth detected', () => {
    const errors = neo.validate('Abcd3fg$')
    assert.strictEqual(errors.length, 0)
  })
})
