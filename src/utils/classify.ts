import { Range, CharClass } from '../types'
import { topology } from '../topology'
import { generate } from './generate';
import { classSize } from './cardinality';

/**
 * Convert a string to an array of code points.
 */
function _toCodePoints(str: string): number[] {
  const chars = Array.from(str)
  const cps = chars.map(c => c.codePointAt(0))
  return cps as number[]
}

/**
 * Convert a list of numbers into a character class.
 */
function _toCharClass(nums: number[]): CharClass {
  nums = nums.slice().sort((a, b) => a - b)
  const cls: Range[] = []

  let i = 0
  while (i < nums.length) {
    const start = i
    do {
      i += 1
    } while (nums[i] === nums[i-1] + 1)
    cls.push([nums[start], nums[i-1]])
  }

  return cls
}

/**
 * Convert a string into a character class.
 */
export function classify(str: string): CharClass
/**
 * Convert a list of numbers into a character class.
 */
export function classify(nums: number[]): CharClass
/**
 * Convert a string or a list of numbers into a character class.
 */
export function classify(value: string|number[]): CharClass {
  if (typeof value === 'string') {
    return _toCharClass(_toCodePoints(value))
  }
  return _toCharClass(value)
}

// const nums = [1, 7, 12]
// // const nums = [55356, 56833, 55356, 56858]
// const r = rangeify(nums)
// console.log(r)

// const str = '🈁🈚🈯🈲🈳🈴🈵🈶🈷🈸🈹🈺🉐🉑🌀🌁🌂🌃🌄🌅🌆🌇🌈🌉🌊🌋🌌🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞🌟🌠🌡🌢🌣🌤🌥🌦🌧🌨🌩🌪🌫🌬🌭🌮🌯🌰🌱🌲🌳🌴🌵🌶🌷🌸🌹🌺🌻🌼🌽🌾🌿🍀🍁🍂🍃🍄🍅🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍔🍕🍖🍗🍘🍙🍚🍛🍜🍝🍞🍟🍠🍡🍢🍣🍤🍥🍦🍧🍨🍩🍪🍫🍬🍭🍮🍯🍰🍱🍲🍳🍴🍵🍶🍷🍸🍹🍺🍻🍼🍽🍾🍿🎀🎁🎂🎃🎄🎅🎆🎇🎈🎉🎊🎋🎌🎍🎎🎏🎐🎑🎒🎓🎔🎕🎖🎗🎘🎙🎚🎛🎜🎝🎞🎟🎠🎡🎢🎣🎤🎥🎦🎧🎨🎩🎪🎫🎬🎭🎮🎯🎰🎱🎲🎳🎴🎵🎶🎷🎸🎹🎺🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏅🏆🏇🏈🏉🏊🏋🏌🏍🏎🏏🏐🏑🏒🏓🏔🏕🏖🏗🏘🏙🏚🏛🏜🏝🏞🏟🏠🏡🏢🏣🏤🏥🏦🏧🏨🏩🏪🏫🏬🏭🏮🏯🏰🏱🏲🏳🏴🏵🏶🏷🏸🏹🏺🏻🏼🏽🏾🏿'
// const chars = Array.from(str)
// const codepoints = chars.map(c => c.codePointAt(0)).filter(n => n !== undefined)
// const r = _toCharClass(codepoints as number[])
// console.log(r)

// const str = '🌄🌅🌆🌇🌈🌉🌊🌋🌌🌍🌎🌏🌐'
// console.log(_toCodePoints(str))
// console.log(classify(str))
// console.log(topology(str))

const str = '🌂🌃🌄🌅🌆🌇🌈🌉🌊🌋🌌🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞🌟🌠🌡🌤🌥🌦🌧🌨🌩🌪🌫🌬🌭🌮🌯🌰🌱🌲🌳🌴🌵🌶🌷🌸🌹🌺🌻🌼🌽🌾🌿🍀🍁🍂🍃🍄🍅🍆🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍔🍕🍖🍗🍘🍙🍚🍛🍜🍝🍞🍟🍠🍡🍢🍣🍤🍥🍦🍧🍨🍩🍪🍫🍬🍭🍮🍯🍰🍱🍲🍳🍴🍵🍶🍷🍸🍹🍺🍻🍼🍽🍾🍿🎀🎁🎂🎃🎄🎅🎆🎇🎈🎉🎊🎋🎌🎍🎎🎏🎐🎑🎒🎓🎖🎗🎙🎚🎛🎞🎟🎠🎡🎢🎣🎤🎥🎦🎧🎨🎩🎪🎫🎬🎭🎮🎯🎰🎱🎲🎳🎴🎵🎶🎷🎸🎹🎺🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏅🏆🏇🏈🏉🏊🏋🏌🏍🏎🏏🏐🏑🏒🏓🏔🏕🏖🏗🏘🏙🏚🏛🏜🏝🏞🏟🏠🏡🏢🏣🏤🏥🏦🏧🏨🏩🏪🏫🏬🏭🏮🏯🏰🏳🏴🏵🏷🏸🏹🏺'
const cls = classify(str)
const pass = generate(10, [cls])
console.log(Array.from(str).length)
console.log(classSize(cls))
console.log(Array.from(pass))
