import { CharClass, CharSet, CharClasses, TopoChar } from './types'
import { classSize } from './utils/cardinality'
import { copyClass } from './utils/copy'
import { inRange } from './utils/in-range'

export interface IClassMap {
  readonly [key: string]: CharClass
}

// Control Characters
const c: CharClass = [[0x00, 0x1f], [0x7f, 0x7f]]
// Upper-case letters
const u: CharClass = [[0x41, 0x5a]]
// Lower-case letters
const l: CharClass = [[0x61, 0x7a]]
// Digits
const d: CharClass = [[0x30, 0x39]]
// Special keyboard characteres
const s: CharClass = [[0x20, 0x2f], [0x3a, 0x40], [0x5b, 0x60], [0x7b, 0x7e]]
// High/upper ascii
const h: CharClass = [[0x80, 0xff]]
// Extended [256, 65535] (to 16-bit space)
const e: CharClass = [[0x100, 0xffff]]
// Unicode only [65536, 1114111]
const n: CharClass = [[0x10000, 0x10ffff]]
// Everything from 1114112 to 4294967295 (32-bit space)
const z: CharClass = [[0x110000, 0xffffffff]]

const _charClasses: CharClasses = { c, u, l, d, s, h, e, n, z }
const _topoChars = new Set(Object.keys(_charClasses) as TopoChar[])

// Calculate the cardinality of each characrer class.
const _classDepth = Object.entries(_charClasses).reduce((map, pair) => {
  const [key, value] = <[TopoChar, CharClass]>pair
  map[key] = classSize(value)
  return map
}, <{[T in TopoChar]: number}>{})

/**
 * Convert a list of topology characters into an IClassMap.
 */
function _classes(topoChars: TopoChar[]) {
  const classMap = topoChars.reduce((map, char) => {
    map[char] = copyClass(_charClasses[char])
    return map
  }, {} as {[key: string]: CharClass})

  return <IClassMap>classMap
}

/**
 * Convert a list of topology characters into a list of character classes.
 */
function _classList(topoChars: TopoChar[]) {
  return topoChars.reduce((list, char) => {
    list.push(_charClasses[char])
    return list
  }, [] as CharSet)
}

/**
 * Convert a topology string into a TopoChar[]
 */
function _toTopoChars(topoStr: string): TopoChar[] {
  const topo = Array.from(topoStr)
    .filter(t => {
      if (!_topoChars.has(<TopoChar>t)) {
        throw new Error(`unknown topology character "${t}"`)
      }
      return true
    })
  return topo as TopoChar[]
}

/**
 * Check whether a number is a member of a character class.
 */
export function inClass(num: number, cls: CharClass) {
  // Check each range in ranges for membership.
  const len = cls.length
  for (let i = 0; i < len; i++) {
    if (inRange(num, cls[i])) {
      return true
    }
  }

  // Not found.
  return false
}

/**
 * Get the TopoChar that represents the class of the given character.
 */
export function charTopo(char: string): TopoChar {
  const num = char.codePointAt(0)

  if (typeof num !== 'undefined') {
    if (inClass(num, l)) { return 'l' }
    if (inClass(num, u)) { return 'u' }
    if (inClass(num, d)) { return 'd' }
    if (inClass(num, s)) { return 's' }
    if (inClass(num, c)) { return 'c' }
    if (inClass(num, h)) { return 'h' }
    if (inClass(num, e)) { return 'e' }
    if (inClass(num, n)) { return 'n' }
  }

  return 'z'
}

/**
 *
 */
export function classes(topoStr: string): IClassMap
/**
 *
 */
export function classes(topoChars: TopoChar[]): IClassMap
/**
 *
 */
export function classes(value: string|TopoChar[]): IClassMap {
  if (typeof value === 'string') {
    const topo = _toTopoChars(value)
    return _classes(topo)
  }
  return _classes(value)
}

/**
 *
 */
export function classList(topoStr: string): CharSet
/**
 *
 */
export function classList(topoChars: TopoChar[]): CharSet
/**
 *
 */
export function classList(value: string|TopoChar[]): CharSet {
  if (typeof value === 'string') {
    const topo = _toTopoChars(value)
    return _classList(topo)
  }
  return _classList(value)
}

/**
 *
 */
export function topology(str: string): TopoChar[] {
  const topo = Array.from(str)
    .map(charTopo)
    .filter(t => _topoChars.has(<TopoChar>t))
  return topo
}

/**
 * Return the class depth of a string, based on its topology.
 */
export function classDepth(str: string) {
  // Calculate the string's topology and remove duplicates.
  const topoSet = new Set([...topology(str)] as TopoChar[])
  let sum = 0

  for (const t of topoSet) {
    sum += _classDepth[t]
  }

  return sum
}
