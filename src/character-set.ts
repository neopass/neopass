import { CharClass, CharSet } from './types'
import { ICopyable } from './copyable'
import { ISerializable } from './serializable'
import { copy } from './utils/copy'
import { pullFromClass } from './utils/pull'

export interface ICharacterClass {
  classes: CharSet
}

export class CharacterSet implements ICharacterClass, ISerializable, ICopyable<CharacterSet> {
  private _classes: CharSet = []

  constructor(data?: ICharacterClass) {
    if (data != null) {
      this.deserialize(data)
    }
  }

  get classes() {
    return copy(this._classes)
  }

  setClasses(classes: CharSet) {
    this._classes = copy(classes)
    return this
  }

  addClass(cls: CharClass, _pull: number[] = []) {
    this._classes.push(pullFromClass(cls, ..._pull))
    return this
  }

  serialize(): ICharacterClass {
    return { classes: this.classes }
  }

  deserialize(data: ICharacterClass) {
    this.setClasses(data.classes || [])
  }

  copy() {
    return new CharacterSet(this)
  }
}
