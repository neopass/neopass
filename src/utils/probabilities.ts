import { CharSet, RangeData } from '../types'
import { cardinality, rangeSize } from './cardinality'


/**
 * Concatenate nested arrays into a single list.
 */
function concat<T>(list: T[][]): T[] {
  const result: T[] = []
  list.forEach(subList => result.push.apply(result, subList))
  return result
}

/**
 * Generate a probability table for each range in the character classes.
 *
 * @param set
 */
export function probabilities(set: CharSet): RangeData[] {
  // Get the search space of the character class.
  const space = cardinality(set)

  /**
   * Concatenate a character set into a character class,
   * then calculate the probability of each class and output RangeData.
   */
  const rangeData = concat(set)
    // Add probabilities for each character range.
    .map((range) => {
      // The probability is the size of the range over the entire space.
      const p = rangeSize(range) / space
      return <RangeData>[p, range]
    })

  return rangeData
}
