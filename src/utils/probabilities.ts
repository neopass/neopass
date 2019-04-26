import { CharSet, RangeData } from '../types'
import { cardinality, rangeSize } from './cardinality'
import { concatAll } from './concat-all'

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
  const rangeData = concatAll(set)
    // Add probabilities for each character range.
    .map((range) => {
      // The probability is the size of the range over the entire space.
      const p = rangeSize(range) / space
      return <RangeData>[p, range]
    })

  return rangeData
}
