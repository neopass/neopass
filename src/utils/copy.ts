import { Range, CharClass, CharSet } from '../types'

export function copyRange(range: Range): Range {
  return [range[0], range[1]]
}

export function copyClass(cls: CharClass) {
  return cls.reduce((newClass: CharClass, range: Range) =>
    newClass.push(copyRange(range)) && newClass || newClass, [] as CharClass)
}

export function copy(classes: CharSet) {
  return classes.reduce((newCls, cls: CharClass) =>
    newCls.push(copyClass(cls)) && newCls || newCls, [] as CharSet)
}
