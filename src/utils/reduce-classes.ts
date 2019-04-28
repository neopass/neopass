
/**
 * Reduce a topology to its constituent classes.
 */
export function reduceClasses(topology: string): string {
  const topoSet = new Set([...topology])
  return [...topoSet].sort().join('')
}
