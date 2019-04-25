
/**
 * Return a freqency map of the given iterable, e.g.,
 *
 * `frequencies('aaabbc')` => `Map { 'a' => 3, 'b' => 2, 'c' => 1 }`
 *
 * @param iterable
 */
export function frequencies<T>(iterable: Iterable<T>): Map<T, number> {
  const map = new Map()

  for (const x of iterable) {
    map.set(x, (map.get(x) || 0) + 1)
  }

  return map
}
