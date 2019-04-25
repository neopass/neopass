import { IPasswordInfo } from './core/password-info'
import { IPlugin, PluginType } from './plugin'

export type RequestType = keyof IPasswordInfo

export interface IValidatorError {
  name: string,
  msg?: string,
  desc?: string,
  score?: number,
  meta?: any,
}

export interface IValidator {
  request: RequestType[]
  validate(...args: any[]): IValidatorError[]
}

export abstract class ValidatorPlugin implements IPlugin<IValidator> {
  public abstract type: PluginType
  public abstract name: string
  public abstract fn(...args: any[]): IValidator
}

export type Validator = new () => ValidatorPlugin
