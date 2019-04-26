import { IPlugin, PluginType } from './plugin'
import { RequestType } from './core/neo-core'
import { IRequestor } from './requestor'

export interface IDetector extends IRequestor {
  exec(...args: any[]): boolean
}

export abstract class DetectorPlugin implements IPlugin<IRequestor> {
  public abstract type: PluginType
  public abstract name: string
  public abstract fn(...args: any[]): IDetector
}

export type Detector = new () => DetectorPlugin
