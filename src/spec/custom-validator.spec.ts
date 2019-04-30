import assert from 'assert'
import { NeoPass } from '../neo-pass'
import { CustomValidator } from '../plugins'

const neo = new NeoPass({
  plugins: [ new CustomValidator() ],
  validators: [
    {
      plugin: 'custom',
      options: {
        exec(info: any) {
          const desired = 62
          const { depth } = info
          const score = depth / desired
          if (score < 1) {
            return [{name: 'custom-depth', msg: 'not enough character depth', score}]
          }
          return []
        }
      }
    }
   ],
})

describe('CustomValidator', () => {
  it('fails on insufficient depth', () => {
    const errors = neo.validate('abcdefg')
    const [{name, msg}] = errors

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(name, 'custom-depth')
    assert.strictEqual(msg, 'not enough character depth')
  })

  it('passes on sufficient depth', () => {
    const errors = neo.validate('Abc10')

    assert.strictEqual(errors.length, 0)
  })

  it('throws if no fn on options', () => {
    assert.throws(() => {
      neo.validate('abc', [ { plugin: 'custom' }])
    })
  })
})
