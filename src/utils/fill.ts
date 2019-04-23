type MapCbk<T> = (value: T, index: number, array: T[]) => T

/**
 * Return an array of arbitrary values.
 *
 * @param length the length of the array to return
 * @param value the value to fill the array with
 */
export function fill<T>(length: number, value: T): T[]
/**
 * Return an array of arbitrary values.
 *
 * @param length the length of the array to return
 * @param fn a function to generate a value for each element
 */
export function fill<T>(length: number, fn: MapCbk<T>): T[]
/**
 * Return an array of arbitrary values.
 */
export function fill<T>(length: number, value: any) {
  if (typeof value === 'function') {
    return new Array(length).fill(0).map(value) as T[]
  }
  return new Array(length).fill(value) as T[]
}
