# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.1] - 2019-04-28
- Add `verify` function to neopass module.

## [0.5.0] - 2019-04-28
- Rename `classList` utility to charSet.

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
