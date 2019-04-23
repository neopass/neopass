import { IPasswordInfo } from './password-info'

export type RequestType = keyof IPasswordInfo

export interface IValidatorError {
  name: string,
  message?: string,
  description?: string,
  score?: number
}

export interface IValidator {
  request: ('password'|RequestType)[]
  validate(...args: any[]): IValidatorError[]
}
