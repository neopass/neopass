import { Range, CharClass } from '../types'

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
