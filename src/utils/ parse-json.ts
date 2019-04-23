
/**
 * Try to parse a string as a json value.
 */
export function parseJson(str: string) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}
