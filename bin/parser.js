'use strict'

/**
 * @typedef {'hex'|'random'|'letters-numbers'} GenType
 * @typedef {'gen'} CommandType
 *
 * @typedef {Object} Result
 * @property {CommandType} cmd
 * @property {GenType} type
 * @property {number} value
 */

/**
 * @returns {string}
 */
function usage() {
  return 'usage: neopass gen <hex|random|letters-numbers> <length>\n'
}

/**
 * @param {GenType} type
 * @param {Result} result
 * @param {string[]} args
 * @returns {GenType}
 */
function genType(type, result, args) {
  result.type = type
  result.value = +args.pop()
  return type
}

/**
 * @param {string[]} args
 */
function parser(args) {
  args.reverse()
  /**
   * @type {Result}
   */
  const result = {}

  let argError = false
  while (args.length > 0) {
    const arg = args.pop()
    switch (arg) {
      case 'gen': {
        result.cmd = 'gen'
        break
      }
      case 'hex': {
        result.type = genType('hex', result, args)
        break
      }
      case 'random': {
        result.type = genType('hex', result, args)
        break
      }
      case 'letters-numbers': {
        result.type = genType('letters-numbers', result, args)
        break
      }
      default: {
        process.stderr.write(`unrecognized argument "${arg}"\n`)
        argError = true
      }
    }
  }

  if (argError || isNaN(result.value) || Object.keys(result).length < 3) {
    process.stdout.write(usage())
    return null
  }

  return result
}

module.exports = parser
