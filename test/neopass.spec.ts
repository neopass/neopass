import assert from 'assert'
import neopass, { NeoPass } from '../src'
import { shannon } from '../src/utils'

describe('neopass', () => {
  let neo = neopass({
    validators: ['length:min=10,max=72'],
    evaluators: [{ validators: ['shannon:32'] }],
  })

  it('validates a password', () => {
    const fail = neo.validate('abcdefg')
    assert.strictEqual(fail.length, 1)

    const pass = neo.validate('abcdefghij')
    assert.strictEqual(pass.length, 0)
  })

  it('evaluates a password', () => {
    const fail = neo.evaluate('abcdefg')
    assert(fail.strength < 1)

    const pass = neo.evaluate('abcdefghij')
    assert(pass.strength >= 1)
  })

  it('detects a passphrase', () => {
    const noPhrase = neo.validate('abcdefg')
    assert.strictEqual(noPhrase.length, 1)

    const phrase = neo.validate('abcdefghijklmnopqrst', ['passphrase:20', 'shannon:128'])
    assert.strictEqual(phrase.length, 0)

    assert.throws(() => {
      neo.validate('abc', ['passphrase'])
    })
  })

  it('generates a password', () => {
    const pass1 = neo.generate(20, 'random')
    const pass2 = neo.generate(20, 'letters-numbers')
    const pass3 = neo.generate(20, 'hex')

    assert(shannon(pass1) * pass1.length > 64)
    assert(shannon(pass2) * pass2.length > 64)
    assert(shannon(pass3) * pass3.length > 64)
  })

  it('retries password generation', () => {
    assert.throws(() => {
      neo.generate(9, 'letters-numbers', 10)
    })
  })

  it('lists registered generators', () => {
    const generators = neo.generators()
    const names = generators.map(g => g.name)

    assert(names.includes('random'))
    assert(names.includes('letters-numbers'))
  })

  it('bypasses registered validators', () => {
    const result = neo.validate('abcdefg', ['classes:and=ul'])
    const [error] = result

    assert.strictEqual(error.name, 'classes')
    assert.strictEqual(error.meta, 'u')
  })

  it('bypasses registered evaluators', () => {
    const result = neo.evaluate('abcdefg', [{ validators: ['entropy:62'] }])
    const {strength, warnings} = result
    const [warning] = warnings

    assert(strength < 1)
    assert(warnings.length === 1)
    assert(warning.name === 'entropy')
  })

  it('verifies a password', () => {
    const result = neo.verify('abcdefghi')
    const {errors, warnings} = result

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(warnings.length, 1)
  })
})
