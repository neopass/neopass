import { IPlugin } from '../plugin'
import { PluginInfo } from '../plugin-info'
import { IEvaluator } from '../evaluator'

// Neopass configuration interface.
export interface IBaseConfig {
  plugins?: IPlugin[]
  validators?: PluginInfo[]
  evaluators?: IEvaluator[]
}
