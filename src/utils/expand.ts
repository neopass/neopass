import { Range, CharClass, CharSet } from '../types'

export function expandRange(range: Range): number[] {
  const nums: number[] = []
  const size = range[1] - range[0] + 1

  if (size > 1e4) {
    throw new Error('refusing to expand a range > 10,000')
  }

  const [start, end] = range

  for (let i = start; i <= end; i++) {
    nums.push(i)
  }

  return nums
}

export function expandClass(cls: CharClass): number[] {
  const chars = cls.reduce((list, range) => {
    list.push.apply(list, expandRange(range))
    return list
  }, [] as number[])

  return chars
}

export function expandSet(classes: CharSet): number[] {
  const chars = classes.reduce((list, cls) => {
    list.push.apply(list, expandClass(cls))
    return list
  }, [] as number[])

  return chars
}

export function toChars(nums: number[]) {
  return nums.map(n => String.fromCodePoint(n))
}
