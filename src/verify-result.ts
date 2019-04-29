import { IValidatorError } from './validator'

export interface IVerifyResult {
  errors: IValidatorError[]
  warnings: IValidatorError[]
}
