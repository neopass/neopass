/**
 * Topology characters representing distinct character classes.
 */
export type TopoChar = 'c'|'u'|'l'|'d'|'s'|'h'|'e'|'n'|'z'

/**
 * A character range by numbers [start, end].
 */
export type Range = [number, number]

/**
 * A list of character ranges.
 */
export type CharClass = Range[]

/**
 * A list of character classes.
 */
export type CharSet = CharClass[]

/**
 * A map of { topology character => character class }
 */
export type CharClasses = { [T in TopoChar]: CharClass }

/**
 * Probability data for a character range.
 */
export type RangeData = [number, Range]

/**
 * Key/value map type.
 */
export type KeyVals = {[key: string]: any}
