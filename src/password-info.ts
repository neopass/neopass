import { classDepth, topology as _topology } from './topology'
import { entropy } from './utils/entropy'
import { shannon } from './utils/shannon'

export interface IPasswordInfo {
  readonly length: number
  readonly depth: number
  readonly topology: string
  readonly classes: string
  readonly entropy: number
  readonly shannon: number
}

/**
 * Reduce a topology to its constituent classes.
 */
function _reduceClasses(topology: string): string {
  const topoSet = new Set([...topology])
  return [...topoSet].sort().join('')
}

/**
 * Generate a password info object.
 */
export function passwordInfo(password: string): IPasswordInfo {
  const depth = classDepth(password)
  const topology = _topology(password).join('')

  const info = {
    depth,
    topology,
    length: password.length,
    classes: _reduceClasses(topology),
    entropy: entropy(depth),
    shannon: shannon(password)
  }

  return info
}
