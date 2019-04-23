
/**
 * Concatenate nested arrays into a single list.
 *
 * @param list
 */
export function concat<T>(list: T[][]): T[] {
  const result: T[] = []
  list.forEach(subList => result.push.apply(result, subList))
  return result
}
