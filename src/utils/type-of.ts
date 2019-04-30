
/**
 * Return the internal type of the given object, e.g.,
 *
 * `typeOf(/a/) => RegExp`
 *
 * @param obj
 */
export function typeOf(obj: any): string {
  return Object.prototype.toString.call(obj).slice(8, -1)
}
