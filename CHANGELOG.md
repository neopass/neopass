# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.4] 2019-05-01
- Update permissions on bin/neopass.

## [0.8.3] 2019-05-01
- Allow spaces in plugin ref arguments.
- Add neopass cli (supports password generation).

## [0.8.2] - 2019-05-01
- Fix circular reference issue in `neopass.ts` when *.d.ts file is generated.
- Upgrade typescript to `3.4.5`

## [0.8.1] - 2019-05-01
- Export neopass as exports.neopoass

## [0.8.0] - 2019-05-01
- `expand` utility functions return number arrays instead of character arrays.
- Added `toChars` method to `expand.ts`.
- Renamed `expand` function to `expandset`.
- Added `HexGenerator` plugin.
- Added `HexGenerator` to built-in generators.
- `RunValidator` and `SequenceValidator` errors include metadata for the number of detected runs/sequences.

## [0.7.1] - 2019-04-30
- Export `verify-result.ts` from index.
- Move `*.spec` files to `/spec`.
- Throw an error if reconfiguration of `neopass` attempted.

## [0.7.0] - 2019-04-30
- Remove `CustomValidator` plugin and add support for inlining custom validator functions.

## [0.6.3] = 2019-04-29
- Fix bad value guard on validation retries.
- Miscellaneous small fixes based on spec authoring.

## [0.6.2] - 2019-04-29
- Add `CustomValidator` to plugins.

## [0.6.1] - 2019-04-29
- Some validators were returning the wrong message property name.
- Generator plugins shouldn't define the `type` property.

## [0.6.0] - 2019-04-29
- Detectors are used in the validation chain to halt early.
- Validator plugins don't need to define a `type` property.
- `useBuiltinDetectors` removed from IBaseConfig.
- `neopass.verify` returns { errors, warnings } object.
- `neopass.validate` no longer accepts a `passphrase` argument.
- Remove 'quick' configurations (`neopass.validators`).

## [0.5.1] - 2019-04-28
- Add `verify` function to neopass module.

## [0.5.0] - 2019-04-28
- Rename `classList` utility to `charSet`.

## [0.4.0] - 2019-04-27
- Implement unit tests.
- Validate function argument `validators` accepts null.
- Validate function accepts passphrase override.

## [0.3.0] - 2019-04-26
- NeoPass and NeoCore take IBaseConfig instead of INeoConfig.

## [0.2.1] - 2019-04-25
- Add 'detectors' plugin type.
- Add a passphrase detection mechanism.
- Export all types from index.

## [0.2.0] - 2019-04-25
- Create NeoPass class to encapsulate module initialization.
- Refactor module dependencies to externalize some elements and embed/privatize others.
- Add type exports to index

## [0.1.5] - 2019-04-25
- Create license.

## [0.1.4] - 2019-04-25
- Add failure metadata to LengthValidator error output.
- Add retry facility to generator function to retry validation failures.

## [0.1.3] - 2019-04-25
- Evaluator weights are applied even for validators that return a score.

## [0.1.2] - 2019-04-24
- Add evaluator flow.

## [0.1.1] - 2019-04-24
Under development
