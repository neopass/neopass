import { frequencies } from './frequencies'

/**
 * Return the Shannon entropy of a string in bits per symbol.
 *
 * @param {string} str
 *
 * @return {number}
 */
export function shannon(str: string): number {
  const len = str.length
  // Get a map of the character frequencies in the string.
  const freq = frequencies(str)
  // Sum the frequencies of each character's probability.
  return Array.from(freq.values()).reduce((sum, f) => {
    // The probability of each character.
    const p = f/len
    // Accumulate Shannon entropy on the character's probability.
    return sum -= p * Math.log2(p)
  }, 0)
}
