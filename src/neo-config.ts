import { IBaseConfig } from './core/base-config'

// Neopass configuration interface.
export interface INeoConfig extends IBaseConfig {
  /**
   * Use built-in password generator plugins. Default: true.
   */
  useBuiltinGenerators?: boolean
  /**
   * Use built-in validator plugins. Default: true.
   */
  useBuiltinValidators?: boolean
}
