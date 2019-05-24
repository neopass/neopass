import { IPlugin } from '../plugin'
import { PluginInfo } from '../plugin-info'
import { IEvaluator } from '../evaluator'

/**
 * Neopass base configuration interface.
 */
export interface IBaseConfig {
  /**
   * A list of plugins to use, which conform to IPlugin.
   */
  plugins?: IPlugin[]
  /**
   * Configure the validation chain.
   */
  validators?: PluginInfo[]
  /**
   * Configure the evaluation chain.
   */
  evaluators?: IEvaluator[]
}
