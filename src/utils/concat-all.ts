
/**
 * Concatenate nested arrays into a single list.
 */
export function concatAll<T>(list: T[][]): T[] {
  const result: T[] = []
  list.forEach(subList => result.push.apply(result, subList))
  return result
}
