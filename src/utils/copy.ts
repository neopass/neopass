import { Range, CharClass, CharSet } from '../types'

export function copyRange(range: Range): Range {
  return [range[0], range[1]]
}

export function copyClass(cls: CharClass) {
  return cls.reduce((newClass: CharClass, range: Range) => {
    newClass.push(copyRange(range))
    return newClass
  }, [] as CharClass)
}

export function copySet(classes: CharSet) {
  return classes.reduce((newSet, cls: CharClass) => {
    newSet.push(copyClass(cls))
    return newSet
  }, [] as CharSet)
}
