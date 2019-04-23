/**
 * Determine the elapsed time a block of code takes to execute
 * and return that time in milliseconds.
 *
 * @param cb a function containing the code to be profiled.
 */
export function profile(cb: () => void): number {
  const start = process.hrtime()
  cb()
  const [sec, nsec] = process.hrtime(start)
  return sec * 1000 + nsec / 10e6
}
