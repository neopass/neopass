[![Build Status](https://travis-ci.org/neopass/neopass.svg?branch=master)](https://travis-ci.org/neopass/neopass)
[![codecov](https://codecov.io/gh/neopass/neopass/branch/master/graph/badge.svg)](https://codecov.io/gh/neopass/neopass)

# neopass
A password validation and generation tool kit.

- [Password generation](#password-generation)
- [Password validation](#the-validation-chain)
- [Password strength](#the-evaluation-chain)
- [Passphrase support](#passphrase-detection)

"One of the most exciting packages on npm!" - _nobody_

"Does anyone really need a password framework?" - _somebody_

"The only good password is a random password of sufficient entropy." - _unknown_

## Under Development

This package is currently under development and the interface is unstable. While the package remains at version `0.x.y`, the minor version will be updated when known breaking changes occur.

Contents
- [Installation](#installation)
- [Basics](#basics)
  - [Password Generation](#password-generation)
  - [The Vaidation Chain](#the-validation-chain)
  - [The Evaluation Chain](#the-evaluation-chain)
  - [Passphrase Detection](#passphrase-detection)
  - [Custom Validators](#custom-validators)
  - [Optional Rules](#optional-rules)
  - [Plugins](#plugins)
    - [Authoring a Validator Plugin](#authoring-a-validator-plugin)

## Installation

```
npm install neopass
```

## Basics

### Password Generation

```typescript
import neopass, { INeoConfig } from 'neopass'

const config: INeoConfig = {
  useBuiltinGenerators: true, // default
}

neopass(config)

const pass1 = neopass.generate(12, 'random')
console.log('random:', pass1)

const pass2 = neopass.generate(12, 'letters-numbers')
console.log('letters-numbers', pass2)
```

Output:

```
random: |6Tc/]>4KY:5
letters-numbers: WIW71lZEuUsN
```

#### Registered Generators

A list of registered generators can be obtained with the following call:

```typescript
  const generators = neopass.generators()
  console.log('generators:', generators)
```

Output:

```
generators: [
  {
    name: 'random',
    title: 'Random'
  },
  {
    name: 'letters-numbers',
    title: 'Letters & Numbers'
  }
]
```

### The Validation Chain

The validation chain reports errors from each configured validator.

```typescript
import neopass, { INeoConfig } from 'neopass'

const config: INeoConfig = {
  useBuiltinValidators: true, // default

  // These are run when validate is called.
  validators: [
    'length:min=10,max=72',
    'classes:and=ul,or=ds',
  ]
}

neopass(config)

const errors = neopass.validate('spokane')
console.log('errors:', errors)
```

Output:

```
errors: [
  {
    name: 'length',
    msg: 'password length should be between 10 and 72 characters, inclusive',
    score: 0.7
  },
  {
    name: 'classes',
    msg: 'missing uppercase character',
    meta: 'u'
  },
  {
    name: 'classes',
    msg: 'missing one of digit, special',
    meta: 'ds'
  }
]
```

### The Evaluation Chain

The evaluation chain reports a password's strength based on configured evaluators.

```typescript
import neopass, { INeoConfig } from 'neopass'

const config: INeoConfig = {
  useBuiltinValidators: true, // default

  // These are run when evaluate is called.
  evaluators: [
    {
      weight: 0.9,
      validators: [
        'length:min=10,max=72',
      ],
    },
    {
      weight: 0.7,
      validators: [
        'classes:and=ul,or=ds',
      ],
    },
  ]
}

neopass(config)

const result = neopass.evaluate('Spokane')
console.log('result:', result)
```

Output:

```
result: {
  strength: 0.44099999999999995,
  warnings: [
    {
      name: 'length',
      msg: 'password length should be between 10 and 72 characters, inclusive',
      score: 0.7
    },
    {
      name: 'classes',
      msg: 'missing one of digit, special',
      meta: 'ds'
    }
  ]
}
```

Assessing password _strength_ is subjective and can be rather arbitrary. A good philosopy is to define evaluators that represent a near-ideal or practically-perfect password, so that there is a good range between low-strength and high-strength passwords, and you're not representing an overly-optimistic strength assessment.

Here's an example that makes some attempt at a reasonable strength evaluation:

```typescript
neopass({
  // ...
  evaluators: [
    {
      /**
       * These don't necessarily need 'weight' because they
       * return a score, which is used to calculate strength.
       * If weight is present, it's multiplied by the score.
       */
      validators: [
        'length:min=20,max=72',
        'entropy:64',
      ],
    },
    {
      /**
       * These validators don't return a score, so each
       * error/warning multiplies the strength by 0.75.
       */
      weight: 0.75,
      validators: [
        'run:2',
        'sequence:3',
        'classes:and=ul,or=ds',
        'topology:standard=true',
      ],
    },
  ],
})
```

Bad:

```typescript
neopass.evaluate('Denver2016')
```

```
{ strength: 0.348878690061731,
  warnings:
   [ { name: 'length',
       msg: 'password length should be between 20 and 72 characters, inclusive',
       score: 0.5,
       meta: 'min' },
     { name: 'entropy',
       msg: 'password is either too short or not complex enough',
       score: 0.9303431734979493 },
     { name: 'topology',
       msg: 'password matches vulnerable pattern topology' } ] }
```

Still bad:

```typescript
neopass.evaluate('Denver2016!')
```

```
{ strength: 0.41250000000000003,
  warnings:
   [ { name: 'length',
       msg: 'password length should be between 20 and 72 characters, inclusive',
       score: 0.55,
       meta: 'min' },
     { name: 'topology',
       msg: 'password matches vulnerable pattern topology' } ] }
```

Not great:

```typescript
neopass.evaluate('D3nv3r2016!')
```

```
{ strength: 0.55,
  warnings:
   [ { name: 'length',
       msg: 'password length should be between 20 and 72 characters, inclusive',
       score: 0.55,
       meta: 'min' } ] }
```

Good:

```typescript
neopass.evaluate('D3nv3r2016!and17$')
```

```
{ strength: 0.85,
  warnings:
   [ { name: 'length',
       msg: 'password length should be between 20 and 72 characters, inclusive',
       score: 0.85,
       meta: 'min' } ] }
```

Great?:

```typescript
neopass.evaluate('correct Horse battery staple')
```

```
{ strength: 1, warnings: [] }
```

Strength assessment is a bit of both art and science, and it won't assure a great password. However it is a good tool to help users to create better passwords in general.

### Passphrase Detection

[Passphrases](https://xkcd.com/936/) are long passwords typically comprised of multiple words. These
are considered to be more secure than shorter, mixed-class passwords. If configured,
`neopass` will detect a passphrase and bypass additional validation in the validation chain.

```typescript
import neopass, { INeoConfig } from 'neopass'

const config: INeoConfig = {
  validators: [
    // Passwords with 20 or more characters will be treated as passphrases.
    'passphrase:min=20',
    'length:min=10,max=72',
    'classes:and=ul,or=ds',
  ]
}

neopass(config)

/**
 * The below password would normally fail the 'classes' validator
 * as configured because there is no digit/special character.
 */
const errors = neopass.validate('Lemme get this smooth')
console.log('errors:', errors)
```

Output:

```
errors: []
```

### Custom Validators

Custom validators can be used by either [authoring a validator plugin](#authoring-a-validator-plugin) or using the built-in `CustomValidator` plugin:

```typescript
/**
 * Create a custom validator function.
 */
function customDepth(info: any) {
  const desired = 62
  const { depth } = info
  if (depth < desired) {
    const score = depth / desired
    // Failed - return an error.
    return [{name: 'custom-depth', msg: 'not enough character depth', score}]
  }
  // Passed!
  return []
}

// Configure neopass.
neopass({
  validators: [
    {
      plugin: 'custom',
      options: {
        exec: customDepth
      }
    }
  ]
})

// Validate a password.
neopass.validate('abcdefg')
```

Output:

```
[ { name: 'custom-depth',
    msg: 'not enough character depth',
    score: 0.41935483870967744 } ]
```

**Warning**: `CustomValidator` has access to all password stats, including the password itself. For this reason, ___`CustomValidator` should not be extended in third party plugins___. Don't use any plugin that extends `CustomValidator`.

### Optional Rules

If you want optional rules - that is, rules where errors are treated as warnings - use `neopass.verify` which joins validation and evaluation. Validation failures are returned as errors and evaluation failures are returned as warnings.

```typescript
import neopass, { INeoConfig } from 'neopass'

const config: INeoConfig = {
  validators: [
    'length:min=10,max=72',
    'classes:and=ul,or=ds',
  ],

  evaluators: [
    {
      validators: [
        'shannon:32',
        'entropy:64',
        'topology:standard=true',
      ],
    },
  ],
}

neopass(config)

const result = neopass.verify('Denver2016')
console.log(result)
```

Output:

```
{
  errors: [],
  warnings: [
    {
      name: 'shannon',
      msg: 'password is too simple',
      score: 0.9756025296523007
    },
    {
      name: 'entropy',
      msg: 'password is either too short or not complex enough',
      score: 0.9303431734979493
    },
    {
      name: 'topology',
      message: 'password matches vulnerable pattern topology'
    }
  ]
}
```

### Plugins

`neopass` runs on plugins. Generators and validators are all plugins and can be specified as part of the configuration.

Config:

```typescript
import neopass, { INeoConfig } from 'neopass'

import {
  // Generators
  LettersNumbersGenerator,
  RandomGenerator,
  // Validators
  ClassesValidator,
  DepthValidator,
  EntropyValidator,
  LengthValidator,
  RunValidator,
  PassphraseDetector,
  SequenceValidator,
  ShannonValidator,
  TopologyValidator,
} from 'neopass/plugins'

/**
 * Configuration
 */
const config: INeoConfig = {
  // We'll specify our own list of plugins.
  useBuiltinGenerators: false,
  useBuiltinValidators: false,

  // Specify plugins to be registered.
  plugins: [
    new LettersNumbersGenerator(),
    new EntropyValidator(),
    new ShannonValidator(),
    new SequenceValidator(),
    new RunValidator(),
    new TopologyValidator(),
  ],

  validators: [
    'entropy:64',
    'shannon:32',
    'sequence:3',
    'run:2',
    'topology:standard=true',
  ]
}

neopass(config)
```

**Generate**

```typescript
const pass = neopass.generate(12, 'letters-numbers')
console.log('password:', pass)
```

Output:

```
password: v2mQsx6SKZ3s
```

**Validate**

Validate the generated password:

```typescript
const errors = neopass.validate('v2mQsx6SKZ3s')
console.log('errors:', errors)
```

Output:

```
errors: []
```

Validate some other password:

```typescript
const errors = neopass.validate('abcdefg777')
console.log('errors:', errors)
```

Output:

```
errors: [
[
  {
    name: 'entropy',
    msg: 'password is either too short or not complex enough',
    score: 0.8078007814753613
  },
  {
    name: 'shannon',
    msg: 'password is too simple',
    score: 0.8895122952096924
  },
  {
    name: 'sequence',
    message: 'password contains at least 2 character sequence(s)'
  },
  {
    name: 'run',
    message: 'password contains at least 1 character run(s)',
    meta: 1
  },
  {
    name: 'topology',
    message: 'password matches vulnerable pattern topology'
  }
]
```

#### Authoring a Validator Plugin

```typescript
import { IValidator, ValidatorPlugin, IValidatorError } from 'neopass'

/**
 * A simplified version of the LenthValidator plugin
 */
export class SimpleLengthValidator extends ValidatorPlugin {
  // Implement required plugin name as a getter.
  get name(): string { return 'simple-length' }

  /**
   * This gets called to pass arguments to the plugin. For example,
   *
   *   validators: [ 'simple-length:10' ]
   *
   * will pass `10` to the configure method as the first
   * argument following `options`.
   */
  configure(options: any, min: number): IValidator {
    const name = this.name  // alias for use in exec
    const msg = 'password too short!'

    const validator: IValidator = {
      // Any requested password info will be passed to exec, in order.
      request: ['length'],

      // The validation logic.
      exec(length: number): IValidatorError[] {
        if (length < min) {
          // Return one or more error objects.
          return [{ name, msg }]
        }
        // No errors!
        return []
      }
    }

    return validator
  }
}
```

Configuration:

```typescript
import { SimpleLengthValidator } from './somewhere'

neopass({
  plugins: [
    new SimpleLengthValidator()
  ],

  validators: [
    'simple-length:10'
  ]
})

neopass.validate('abc')
```

Output:

```
[ { name: 'simple-length', msg: 'password too short!' } ]
```

**Password Info**

A validator plugin can request any of the following password info items:

```typescript
interface IPasswordInfo {
  readonly password: string   // the password
  readonly length: number     // the length
  readonly depth: number      // the class depth
  readonly topology: string   // the password topology
  readonly classes: string    // the represented character classes
  readonly entropy: number    // the simple entropy
  readonly shannon: number    // the shannon entropy
}
```

`password`: the original password as given for validation. ___Scrutinize any plugin that requests this attribute!___

`length`: the number of characters in the password.

`depth`: the per-character search space of the password, based on which character classes are present.

`topology`: the per-character classes of the password, e.g., `topology('Abcd1$') => 'ulllds'`. ___Scrutinize any plugin that requests this attribute!___

`classes`: a reduction of the `topology`; that is, the character classes represented in the password, e.g., `classes('Abcdefg') => 'ul'`.

`entropy`: the base-2 logarithm of the `depth`, as bits per symbol/character.

`shannon`: the [Shannon Entropy](https://en.wiktionary.org/wiki/Shannon_entropy) of the password in bits per symbol.

As a rule, always request the minimum amount of information required to fulfill proper validation. For example:
- if you want to know what the password length is, request `length` and not `password` or `topology`.
- if you want to know which classes are represented, request `classes` and not `topology`.

There are legitimate reasons for a validator to request `password`. For instance, both the `RunValidator` and the `SequenceValidator` use `password` to determine if a password has runs of the same character or multiple characters in sequence. Most of the other validators request `length`, `shannon`, `entropy` and/or `depth`. The `TopologyValidator` requests `topology`. However it's dangerous to blindly trust plugins that request `password` or `topology`. _It's safest to only use validators and generators that you author yourself_.
