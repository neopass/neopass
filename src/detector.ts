import { IPlugin, PluginType } from './plugin'
import { IRequestor } from './requestor'
import { PluginInfo } from './plugin-info'

export interface IDetector extends IRequestor<boolean> {
  exec(...args: any[]): boolean
}

export abstract class DetectorPlugin implements IPlugin<IDetector> {
  public abstract type: PluginType
  public abstract name: string
  public abstract configure(...args: any[]): IDetector
  public validators: null|PluginInfo[] = null
}

export type Detector = new () => DetectorPlugin
