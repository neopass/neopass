import { IPasswordInfo } from './password-info'

export type RequestType = keyof IPasswordInfo

export interface IValidatorError {
  name: string,
  msg?: string,
  desc?: string,
  score?: number,
  meta?: any,
}

export interface IValidator {
  request: ('password'|RequestType)[]
  validate(...args: any[]): IValidatorError[]
}
