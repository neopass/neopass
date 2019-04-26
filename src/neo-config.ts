import { IBaseConfig } from './core/base-config'

// Neopass configuration interface.
export interface INeoConfig extends IBaseConfig {
  useBuiltinGenerators?: boolean
  useBuiltinValidators?: boolean
  useBuiltinDetectors?: boolean
}
