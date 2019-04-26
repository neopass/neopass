import { IPlugin } from '../plugin'
import { PluginInfo } from '../plugin-info'
import { IEvaluator } from '../evaluator'

// Neopass configuration interface.
export interface IBaseConfig {
  plugins?: IPlugin[]
  passphrase?: PluginInfo
  validators?: PluginInfo[]
  evaluators?: IEvaluator[]
}