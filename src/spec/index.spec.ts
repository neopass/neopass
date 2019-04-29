import assert from 'assert'
import neopass from '..'
import { shannon } from '../utils'

describe('neopass', () => {
  neopass({
    validators: ['length:min=10,max=72'],
    evaluators: [{ validators: ['shannon:32'] }],
  })

  it('validates a password', () => {
    const fail = neopass.validate('abcdefg')
    assert.strictEqual(fail.length, 1)

    const pass = neopass.validate('abcdefghij')
    assert.strictEqual(pass.length, 0)
  })

  it('evaluates a password', () => {
    const fail = neopass.evaluate('abcdefg')
    assert(fail.strength < 1)

    const pass = neopass.evaluate('abcdefghij')
    assert(pass.strength >= 1)
  })

  it('detects a passphrase', () => {
    const noPhrase = neopass.validate('abcdefg')
    assert.strictEqual(noPhrase.length, 1)

    const phrase = neopass.validate('abcdefghijklmnopqrst', ['passphrase:min=20', 'shannon:128'])
    assert.strictEqual(phrase.length, 0)
  })

  it('generates a password', () => {
    const pass = neopass.generate(20, 'random')

    assert(shannon(pass) > 3.5)
  })

  it('lists registered generators', () => {
    const generators = neopass.generators()
    const names = generators.map(g => g.name)

    assert(names.includes('random'))
    assert(names.includes('letters-numbers'))
  })

  it('bypasses registered validators', () => {
    const result = neopass.validate('abcdefg', ['classes:and=ul'])
    const [error] = result

    assert.strictEqual(error.name, 'classes')
    assert.strictEqual(error.meta, 'u')
  })

  it('bypasses registered evaluators', () => {
    const result = neopass.evaluate('abcdefg', [{ validators: ['entropy:62'] }])
    const {strength, warnings} = result
    const [warning] = warnings

    assert(strength < 1)
    assert(warnings.length === 1)
    assert(warning.name === 'entropy')
  })

  it('verifies a password', () => {
    const result = neopass.verify('abcdefghi')
    const {errors, warnings} = result

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(warnings.length, 1)
  })
})
