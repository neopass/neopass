import { IPlugin } from './plugin'
import { PluginInfo } from './plugin-info'
import { IEvaluator } from './evaluator'

// Neopass configuration interface.
export interface INeoConfig {
  useBuiltinGenerators?: boolean
  useBuiltinValidators?: boolean
  useBuiltinDetectors?: boolean
  plugins?: IPlugin[]
  passphrase?: PluginInfo
  validators?: PluginInfo[]
  evaluators?: IEvaluator[]
}
