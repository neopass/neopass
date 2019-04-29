import { IValidator, ValidatorPlugin } from './validator'

export interface IDetector extends IValidator<boolean> { }

export abstract class DetectorPlugin extends ValidatorPlugin<boolean> {
  public abstract name: string
  public abstract configure(...args: any[]): IDetector
}

export type Detector = new () => DetectorPlugin
