import { IPlugin, PluginType } from './plugin'
import { IRequestor } from './requestor'

export interface IValidatorError {
  name: string,
  msg?: string,
  desc?: string,
  score?: number,
  meta?: any,
}

export interface IValidator extends IRequestor<IValidatorError[]> {
  exec(...args: any[]): IValidatorError[]
}

export abstract class ValidatorPlugin implements IPlugin<IValidator> {
  public abstract type: PluginType
  public abstract name: string
  public abstract configure(...args: any[]): IValidator
}

export type Validator = new () => ValidatorPlugin
