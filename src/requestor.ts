import { RequestType } from './core/neo-core'

export interface IRequestor {
  request: RequestType[]
  exec(...args: any[]): any
}
