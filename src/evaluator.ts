import { PluginInfo } from './plugin-info'

export interface IEvaluator {
  weight?: number
  validators: PluginInfo[]
}
