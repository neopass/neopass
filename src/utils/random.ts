import crypto from 'crypto'

/**
 * Swap two elements of an array in place.
 */
function swap(list: any[], a: number, b: number) {
  const temp = list[a]
  list[a] = list[b]
  list[b] = temp
  return list
}

/**
 * Return a Buffer of _n_ random bytes.
 *
 * @param n the number of bytes to generate
 */
function randomBytes(n: number): Buffer {
  return crypto.randomBytes(n)
}

/**
 * Return true or false at random.
 */
export function randomBit(): boolean {
  return randomBytes(1).readUInt8(0) % 2 === 0
}

/**
 * Return a random byte in the range [0, 255].
 */
export function randomByte(): number {
  return randomBytes(1).readUInt8(0)
}

/**
 * Return a random 32 bit signed integer.
 */
export function randomInt(): number {
  return randomBytes(4).readInt32LE(0)
}

/**
 * Return a random 32 bit unsigned integer.
 */
export function randomUInt(): number {
  return randomBytes(4).readUInt32LE(0)
}

/**
 * Return a random float in the range [0, 1).
 */
export function randomFloat(): number {
  return randomUInt() / 2**32
}

/**
 * Return a random number in the range [min, max).
 *
 * @param value the minimum value
 * @param max the maximum value, inclusive
 */
export function randomIn(min: number, max: number): number {
  if (max < min) {
    throw new Error('max should be >= min')
  }
  return min + Math.floor((max - min) * randomFloat())
}

/**
 * Return a random value from the given list.
 *
 * @param list the list from which to select a value.
 */
export function randomOf<T>(list: T[]): T {
  return list[randomIn(0, list.length)]
}

/**
 * Shuffle elements of an array in place.
 */
export function shuffle<T>(list: T[]): T[] {
  for (let i = 0; i < list.length; i++) {
    const elem = randomIn(i, list.length)
    swap(list, i, elem)
  }
  return list
}

/**
 * Pick _n_ random values from a list.
 */
export function pick<T>(list: T[], num: number): T[] {
  if (num < 0 || num > list.length) {
    throw new Error(`num should be in the range [0, ${list.length}]`)
  }

  const copy = list.slice()
  shuffle(copy)
  return copy.slice(-num)
}

/**
 * Replace an element in a list at raondom.
 */
export function replace<T>(list: T[], value: T): T[] {
  const elem = randomIn(0, list.length)
  list[elem] = value
  return list
}
