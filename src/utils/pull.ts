import { CharClass, Range } from '../types'

/**
 * Pull a single number from a number range. The result
 * is a new character class, e.g,,
 *
 * ```javascript
 * pullFromRange([1, 10], 3) // [[1, 2], [4, 10]]
 * pullFromRange([1, 10], 11) // [[1, 10]]
 * pullFromRange([1, 10], 1) // [[2, 10]]
 * ```
 */
export function pullFromRange(range: Range, num: number): CharClass {
  const [a, b] = range

  // Number is in range.
  if (num >= a && num <= b) {
    if (a === b) {
      /**
       * The start and end values of the range are equal, and this is
       * the number that we want to remove, so return an empty class.
       */
      return []
    } else {
      // The start and end values are different, so partition the range.
      if (a === num) {
        // The matching number is at the beginning of the range.
        return [[a + 1, b]]
      } else if (b === num) {
        // The matching number is at the end of the range.
        return [[a, b - 1]]
      } else {
        // The matching number is in the middle of the range.
        return [[a, num-1], [num+1, b]]
      }
    }
  } else {
    // The num was not in the range, so return an unmodified copy.
    return [[a, b]]
  }
}

/**
 * Pull one or more numbers from a character class. This returns a
 * new class and leaves the original unmodified.
 */
export function pullFromClass(charClass: CharClass, ...nums: number[]): CharClass {
  let _class = charClass

  /**
   * Compose successive pull operations for each num argument.
   * This will result in a new character class for each range
   * in the given class.
   */
  nums.forEach((num) => {
    _class = _class.reduce((cls, range) => {
      const newClass = pullFromRange(range, num)
      cls.push.apply(cls, newClass)
      return cls
    }, [] as CharClass)
  })

  // Return the class with all the numbers pulled from the ranges.
  return _class
}
