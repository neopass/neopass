
export interface ISerializable<T=any> {
  serialize(): T
  deserialize(data: T): void
}
