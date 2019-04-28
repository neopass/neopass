import { RequestType } from './core/neo-core'

export interface IRequestor<T> {
  request: RequestType[]
  exec(...args: any[]): T
}
