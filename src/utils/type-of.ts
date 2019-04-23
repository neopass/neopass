
/**
 * Return the internal type of the given object, e.g.,
 * `typeOf(/a/) => RegExp`
 *
 * @param obj
 */
export function typeOf<T>(obj: T): string {
  return Object.prototype.toString.call(obj).slice(8, -1)
}
