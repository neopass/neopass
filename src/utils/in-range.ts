import { Range } from '../types'

/**
 * Determine if a number is part of a range.
 */
export function inRange(num: number, range: Range) {
  const [start, end] = range
  return num >= start && num <= end
}
