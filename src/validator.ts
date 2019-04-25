import { IPasswordInfo } from './neo-core'

export type RequestType = keyof IPasswordInfo

export interface IValidatorError {
  name: string,
  msg?: string,
  desc?: string,
  score?: number,
  meta?: any,
}

export interface IValidator {
  request: (RequestType)[]
  validate(...args: any[]): IValidatorError[]
}
