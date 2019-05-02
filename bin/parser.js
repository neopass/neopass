'use strict'

function usage() {
  return 'usage: neopass gen <hex|random|letters-numbers> <length>\n'
}

function genType(args) {
  const value = args.pop()
  return +value
}

function parser(args) {
  args.reverse()
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
        result.type = 'hex'
        result.value = genType(args, result.type)
        break
      }
      case 'random': {
        result.type = 'random'
        result.value = genType(args, result.type)
        break
      }
      case 'letters-numbers': {
        result.type = 'letters-numbers'
        result.value = genType(args, result.type)
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
