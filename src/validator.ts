import { IPlugin, PluginType } from './plugin'
import { RequestType } from './core/neo-core'
import { IRequestor } from './requestor'

export interface IValidatorError {
  name: string,
  msg?: string,
  desc?: string,
  score?: number,
  meta?: any,
}

export interface IValidator extends IRequestor {
  exec(...args: any[]): IValidatorError[]
}

export abstract class ValidatorPlugin implements IPlugin<IValidator> {
  public abstract type: PluginType
  public abstract name: string
  public abstract fn(...args: any[]): IValidator
}

export type Validator = new () => ValidatorPlugin
