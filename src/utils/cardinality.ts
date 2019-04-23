import { Range, CharClass, CharSet } from '../types'

/**
 * Calculate the size of a number range, e.g.,
 *
 * ```javascript
 * size([1, 1])  // 1
 * size([6, 10]) // 5
 * size([1, 10]) // 10
 * ```
 * @param range
 */
export function rangeSize(range: Range) {
  const [start, end] = range
  return end - start + 1
}

/**
 * Calculate the size of a character class, e.g.,
 *
 * ```javascript
 * classSize([[1, 10], [11, 20]]) // 20
 * classSize([[1, 1], [2, 3], [4, 5]]) // 5
 * ```
 * @param cls
 */
export function classSize(cls: CharClass) {
  return cls.reduce((sum, range) => sum + rangeSize(range), 0)
}

/**
 * Calculate the size of a character set, e.g.,
 *
 * ```javascript
 * cardinality([[[1, 10], [11, 20]], [[21-25], [26-30]]]) // 30
 * ```
 * @param set
 */
export function cardinality(set: CharSet) {
  return set.reduce((sum, r) => sum + classSize(r), 0)
}
