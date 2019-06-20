import { IPlugin, PluginType } from './plugin'
import { IRequestor } from './requestor'
import { KeyVals } from './types'

export interface IValidatorError {
  name: string,
  msg?: string,
  desc?: string,
  score?: number,
  meta?: any,
}

export interface IValidator<T = IValidatorError[]> extends IRequestor<T> {
  exec(...args: any[]): T|null|undefined
}

export abstract class ValidatorPlugin<T = IValidatorError[]> implements IPlugin<IValidator<T>> {
  public abstract name: string
  public abstract configure(options?: KeyVals, ...args: any[]): IValidator<T>
  get type(): PluginType { return 'validator' }
}

export type Validator<T = any> = new () => ValidatorPlugin<T>
