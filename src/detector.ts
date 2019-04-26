import { IPlugin, PluginType } from './plugin'
import { RequestType } from './core/neo-core'

export interface IDetector {
  request: RequestType[]
  detect(...args: any[]): boolean
}

export abstract class DetectorPlugin implements IPlugin<IDetector> {
  public abstract type: PluginType
  public abstract name: string
  public abstract fn(...args: any[]): IDetector
}

export type Detector = new () => DetectorPlugin
