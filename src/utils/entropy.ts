import { classDepth } from '../topology'

/**
 *
 * @param str
 */
export function entropy(str: string): number
export function entropy(depth: number): number
export function entropy(value: string|number): number {
  if (typeof value === 'number') {
    return Math.log2(value)
  }
  return Math.log2(classDepth(value))
}
