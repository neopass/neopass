import { NeoPass } from './neo-pass'
import { Validator } from './validator'
import { Generator } from './generator'
import { INeoConfig } from './neo-config'

import {
  ClassesValidator,
  DepthValidator,
  EntropyValidator,
  HexGenerator,
  LengthValidator,
  LettersNumbersGenerator,
  RandomGenerator,
  RunValidator,
  SequenceValidator,
  ShannonValidator,
  TopologyValidator,
  PassphraseDetector,
} from './plugins'

// Create a default configuration.
const _defaultConfig: INeoConfig = {
  useBuiltinGenerators: true,
  useBuiltinValidators: true,
}

// Built-in generators.
const _builtinGenerators: Generator[] = [
  HexGenerator,
  LettersNumbersGenerator,
  RandomGenerator,
]

// Built-in validators.
const _builtinValidators: Validator[] = [
  ClassesValidator,
  DepthValidator,
  EntropyValidator,
  LengthValidator,
  PassphraseDetector,
  RunValidator,
  SequenceValidator,
  ShannonValidator,
  TopologyValidator,
]

/**
 * Neopass instance.
 */
export function neopass(config?: INeoConfig|null) {
    // Apply user config to default config.
    config = {..._defaultConfig, ...config}

    // Create a neopass instance.
    const neo = new NeoPass(
      config,
      config.useBuiltinGenerators ? _builtinGenerators : null,
      config.useBuiltinValidators ? _builtinValidators : null)

  return neo
}
