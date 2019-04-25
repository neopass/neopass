import { IPlugin } from './plugin'
import { PluginInfo } from './plugin-info'
import { IEvaluator } from './evaluator'

// Neopass configuration interface.
export interface INeoConfig {
  useBuiltinGenerators?: boolean
  useBuiltinValidators?: boolean
  plugins?: IPlugin[]
  validators?: PluginInfo[]
  evaluators?: IEvaluator[]
}
