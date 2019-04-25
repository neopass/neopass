import { IValidatorError } from './validator'

export interface IEvaluatorInfo {
  strength: number
  warnings: IValidatorError[]
}
