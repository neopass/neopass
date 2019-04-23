export type TopoChar = 'c'|'u'|'l'|'d'|'s'|'h'|'e'|'n'|'z'

export type Range = [number, number]

export type CharClass = Range[]

export type CharSet = CharClass[]

export type CharClasses = { [T in TopoChar]: CharClass }

export type RangeData = [number, [number, number]]
