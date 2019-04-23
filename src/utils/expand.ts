import { Range, CharClass, CharSet } from '../types'

export function expandRange(range: Range) {
  const chars: string[] = []
  const size = range[1] - range[0] + 1

  if (size > 1e4) {
    throw new Error('refusing to expand a range > 10,000')
  }

  const [start, end] = range

  for (let i = start; i <= end; i++) {
    chars.push(String.fromCodePoint(i))
  }

  return chars
}

export function expandClass(cls: CharClass): string[] {
  const chars = cls.reduce((list, range) => {
    list.push.apply(list, expandRange(range))
    return list
  }, [] as string[])

  return chars
}

export function expand(classes: CharSet): string[] {
  const chars = classes.reduce((list, cls) => {
    list.push.apply(list, expandClass(cls))
    return list
  }, [] as string[])

  return chars
}
