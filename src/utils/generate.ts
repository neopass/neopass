import { CharSet } from '../types'
import { randomFloat, randomIn } from './random'
import { fill } from './fill'
import { probabilities } from './probabilities'
import { classList } from '../topology'

/**
 * Generate a random string of the given length from the given list
 * of character classes.
 *
 * @param length
 * @param classes
 */
export function generate(length: number, classes: CharSet) {
  const rangeData = probabilities(classes)
  const rdLen = rangeData.length

  // Sum previous probability in each range data element except the first.
  rangeData.forEach((_, i, rd) => {
    if (i > 0) {
      // Get current and previous probabilities.
      const current = rd[i][0]
      const previous = rd[i-1][0]

      // Sum current and previous into current
      rd[i][0] = previous + current
    }
  })

  // Create an array of the given length and fill it with random characters.
  const p = fill(length, () => {
    // Generate a random value in [0, 1).
    const random = randomFloat()

    // Find the range that the random number falls into.
    for (let i = 0; i < rdLen; i++) {
      const probability = rangeData[i][0]
      if (random < probability) {
        const range = rangeData[i][1]
        const [start, end] = range

        // Return a random character in the range.
        return String.fromCodePoint(randomIn(start, end + 1))
      }
    }
  })

  return p.join('')
}

/**
 * Generate a password of a given length and topology.
 *
 * @param length
 * @param topoStr
 */
export function password(length: number, topoStr: string): string {
  const topoChars = [...new Set([...topoStr])]
  const _classList = classList(topoChars.join(''))
  return generate(length, _classList)
}
