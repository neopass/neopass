[![Build Status](https://travis-ci.org/neopass/neopass.svg?branch=master)](https://travis-ci.org/neopass/neopass)
[![codecov](https://codecov.io/gh/neopass/neopass/branch/master/graph/badge.svg)](https://codecov.io/gh/neopass/neopass)

# neopass
A password validation and generation tool kit.

- [Password generation](#password-generation)
- [Password validation](#the-validation-chain)
- [Password strength](#the-evaluation-chain)
- [Passphrase support](#passphrase-detection)

"One of the most exciting packages on npm!" - _nobody_

"The only good password is a random string of sufficient entropy." - _unknown_

## Under Development

This package is currently under development and the interface is unstable. While the package remains at version `0.x.y`, the minor version will be updated when known breaking changes occur.

## Contents
- [Installation](#installation)
- [Basics](#basics)
  - [Password Generation](#password-generation)
  - [The Validation Chain](#the-validation-chain)
  - [The Evaluation Chain](#the-evaluation-chain)
  - [Passphrase Detection](#passphrase-detection)
- [Built-in Validators](#built-in-validators)
  - [ClassesValidator](#classesvalidator)
  - [CommonValidator](#commonvalidator)
  - [DepthValidator](#depthvalidator)
  - [EntropyValidator](#entropyvalidator)
  - [LengthValidator](#lengthvalidator)
  - [RunValidator](#runvalidator)
  - [SequenceValidator](#sequencevalidator)
  - [ShannonValidator](#shannonvalidator)
  - [TopologyValidator](#topologyvalidator)
- [Configuring Validators](#configuring-validators)
  - [Short Form](#short-form)
  - [Long Form](#long-form)
- [Custom Validators](#custom-validators)
- [Optional Rules](#optional-rules)
- [Plugins](#plugins)
  - [Authoring a Validator Plugin](#authoring-a-validator-plugin)
- [Override Configured Chains](#override-configured-chains)

## Installation

```
npm install neopass
```

## Basics

### Password Generation

Neopass can generate random strings using configured generators. By default, there are three generators available:

`random`: produces _n_ random characters from a character set of typable characters uppercase, lowercase, digit, and special.

`letters-numbers`: produces _n_ random characters from a character set of uppercase, lowercase, and digit.

`hex`: produces _n_ random bytes in hexidecimal form.

```typescript
import { neopass, INeoConfig } from 'neopass'

const config: INeoConfig = {
  useBuiltinGenerators: true, // default
}

const neo = neopass(config)

const pass1 = neo.generate(12, 'random')
console.log('random:', pass1)

const pass2 = neo.generate(12, 'letters-numbers')
console.log('letters-numbers', pass2)

const pass3 = neo.generate(12, 'hex')
console.log('hex', pass3)
```

Output:

```
random: |6Tc/]>4KY:5
letters-numbers: WIW71lZEuUsN
hex: 9b9ede126e4f2556fe1717dc
```

#### Registered Generators

A list of registered generators can be obtained with the following call:

```typescript
  const generators = neo.generators()
  console.log('generators:', generators)
```

Output:

```
generators: [
  { name: 'random', title: 'Random', units: 'char' },
  { name: 'letters-numbers', title: 'Letters & Numbers', units: 'char' },
  { name: 'hex', title: 'Hexidecimal', units: 'byte' }
]
```

### The Validation Chain

The validation chain reports errors from each configured validator.

```typescript
import { neopass, INeoConfig } from 'neopass'

const config: INeoConfig = {
  useBuiltinValidators: true, // default

  /**
   * These validators are run when `validate` is called, and
   * reference built-in validators registered automatically.
   *
   * Each validator is called in sequence and any errors produced
   * are returned by the call.
   *
   */
  validators: [
    /**
     * Password must be between 10 and 72 characters.
     */
    'length:min=10,max=72',
    /**
     * Password must contain an uppercase character, a lowercase
     * character, and one of digit or special character.
     */
    'classes:and=ul,or=ds',
  ]
}

const neo = neopass(config)

// Validate a password.
const errors = neo.validate('spokane')
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
import { neopass, INeoConfig } from 'neopass'

const config: INeoConfig = {
  useBuiltinValidators: true, // default

  /**
   * These are run when `evaluate` is called.
   *
   * Each evaluator object can specify weight and a list of validators.
   *
   * weight: multiplies the strength by the weight for every
   * validation failure in the list of `validators`.
   *
   * validators: a list of validators to run. Validators that return
   * a score have that score applied to the strength in addition to
   * whatever `weight` is specified.
   */
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

const neo = neopass(config)

const result = neo.evaluate('Spokane')
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
const neo = neopass({
  // ...
  evaluators: [
    {
      /**
       * This evaluator doesn't necessarily need 'weight' because
       * these validators return a score, which is used to calculate
       * strength. If weight is present, it's applied to the score.
       */
      validators: [
        'length:min=20,max=72',
        'entropy:64',
      ],
    },
    {
      /**
       * These validators don't return a score, so each
       * error multiplies the strength by 0.75.
       */
      weight: 0.75,
      validators: [
        'run:3',
        'sequence:4',
        'classes:and=ul,or=ds',
        'topology:standard=true',
      ],
    },
  ],
})
```

Bad:

```typescript
neo.evaluate('Denver2016')
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
neo.evaluate('Denver2016!')
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
neo.evaluate('D3nv3r2016!')
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
neo.evaluate('D3nv3r2016!and17$')
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
neo.evaluate('correct Horse battery staple')
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
import { neopass, INeoConfig } from 'neopass'

const config: INeoConfig = {
  validators: [
    // Passwords with 20 or more characters will be treated as passphrases.
    'passphrase:20',
    'length:min=10,max=72',
    'classes:and=ul,or=ds',
  ]
}

const neo = neopass(config)

/**
 * The below password would normally fail the 'classes' validator
 * as configured because there is no digit/special character.
 */
const errors = neo.validate('Lemme get this smooth')
console.log('errors:', errors)
```

Output:

```
errors: []
```

## Built-in Validators

### ClassesValidator

Validates a password based on its _character classes_, mainly `u` (uppercase), `l` (lowercase), `d` (digit), and `s` (special character).

```typescript
const { neopass } = require('neopass')

const config = {
  /**
   * Configure the classes validator to require an uppercase
   * and a lowercase character, plus one of either a digit
   * or a special character (!@#$%^&, etc).
   */
  validators: ['classes:and=ul,or=ds']
}

const neo = neopass(config)

const errors = neo.validate('abcdefg')
console.log(errors)
```

Output:

```
[ { name: 'classes',
    msg: 'missing uppercase character',
    meta: 'u' },
  { name: 'classes',
    msg: 'missing one of digit, special',
    meta: 'ds' } ]
```

### CommonValidator

Validates a password based on whether it's included in a common passwords list.

Note that `CommonValidator` requires a password list to be given in its options, so it is not [short-form](#short-form) configurable.

```typescript
const { neopass } = require('neopass')

const config = {
  /**
   * Configure the common validator with a list of common passwords.
   */
  validators: [
    {
      plugin: 'common',
      options: {
        list: [
          '0123456789',
          'password',
          'superman',
        ]
      }
    }
  ]
}

const neo = neopass(config)

const errors = neo.validate('superman')
console.log(errors)
```

Output:

```
[ { name: 'common',
    msg: 'password found in a common vulnerable password list' } ]
```

### DepthValidator

Validates a password based on its _character depth_, derived from its _classes_. For example, a password `Simple32` has the classes `u`, `l`, and `d`, which means its _depth_ is `u=26 + l=26 + d=10 = 62`.

```typescript
const { neopass } = require('neopass')

const config = {
  /**
   * Configure the depth validator to require a class depth of 62.
   * This equates to a minimum of upper, lower, and digit characters.
   */
  validators: ['depth:62']
}

const neo = neopass(config)

const errors = neo.validate('shadow')
console.log(errors)
```

Output:

```
[ { name: 'depth',
    msg: 'password needs more class complexity (uppercase, lowercase, digit, special)',
    score: 0.41935483870967744 } ]
```

### EntropyValidator

Validates a password based on its _class entropy_, derived from its _character depth_. The entropy is calculated as `Math.log2(depth) * length`, resulting in a number of _bits_ for the entire password string. The _class_ entropy differs from _shannon_ entropy in that the _bits per symbol_ is assumed based on which _character classes_ are represented in the password. This validator is similar to the [DepthValidator](#depthvalidator) in that its value is based on which _classes_ are present in the password, but adds the effect of having awareness of password _length_. In other words, a password may have several character classes represented, yet still be too short to pass validation.

```typescript
const { neopass } = require('neopass')

const config = {
  /**
   * Require 64 bits of character entropy for the password.
   */
  validators: ['entropy:64']
}

const neo = neopass(config)

const errors = neo.validate('Shadow@26') // ulds
console.log(errors)
```

Output:

```
[ { name: 'entropy',
    msg: 'password is either too short or not complex enough',
    score: 0.9238859449215395 } ]
```

### LengthValidator

Validates a password based on its _length_.

Configuration:

```typescript
const { neopass } = require('neopass')

const config = {
  /**
   * Password length must fall within [min, max].
   */
  validators: ['length:min=10,max=72']
}

const neo = neopass(config)
const errors = neo.validate('shorty')
console.log(errors)
```

Output:

```
[ { name: 'length',
    msg: 'password length should be between 10 and 72 characters, inclusive',
    score: 0.6,
    meta: 'min' } ]
```

### RunValidator

Validates whether a password has `runs` of a single character, such as in `pAAAsword`.

```typescript
const { neopass } = require('neopass')

const config = {
  /**
   * Fail if password contains three or more of the same character together.
   */
  validators: ['run:3']
}

const neo = neopass(config)

const errors = neo.validate('pAAAsword')
console.log(errors)
```

Output:

```
[ { name: 'run',
    msg: 'password contains at least 1 character run(s)',
    meta: 1 } ]
```

### SequenceValidator

Validates whether a password has _sequences_ of characters, such as in `ABCDlmnop`.

```typescript
const { neopass } = require('neopass')

const config = {
  /**
   * Fail if password contains four or more characters in sequence.
   */
  validators: ['sequence:4']
}

const neo = neopass(config)

const errors = neo.validate('ABCDlmnop')
console.log(errors)
```

Output:

```
[ { name: 'sequence',
    msg: 'password contains at least 2 character sequence(s)',
    meta: 2 } ]
```

### ShannonValidator

Validates a password based on its _Shannon entropy_. [Shannon entropy](https://en.wiktionary.org/wiki/Shannon_entropy) is given in raw _bits per symbol_. The validator multiplies this by the password _length_ resulting in a number representing the entropy for the entire string: `shannon(password) * length`. Shannon entropy differs from _class_ entropy in that no assumption is made about which _character classes_ are represented by the password; only the symbols in the password itself count toward the _bits per symbol_ calculation.

`shannon('aaaa') // 0 bits per symbol`

`shannon('ab')   // 1 bit per symbol`

`shannon('abcd') // 2 bits per symbol`

`shannon('01234567') // 3 bits per symbol`

`shannon('0123456789abcdef') // 4 bits per symbol`

```typescript
const { neopass } = require('neopass')

const config = {
  /**
   * The password must contain 32 or more bits of Shannon entropy.
   */
  validators: [ 'shannon:32' ]
}

const neo = neopass(config)
const errors1 = neo.validate('1111111111')
const errors2 = neo.validate('shannon')
const errors3 = neo.validate('E for Effort')

console.log('errors1:', errors1)
console.log('errors2:', errors2)
console.log('errors3:', errors3)
```

Output:

```
errors1: [ { name: 'shannon', msg: 'password is too simple', score: 0 } ]
errors2: [ { name: 'shannon', msg: 'password is too simple', score: 0.4655 } ]
errors3: [ { name: 'shannon', msg: 'password is too simple', score: 0.9457 } ]
```

### TopologyValidator

Validates a password according to whether it conforms to certain common topology patterns.

```typescript
const { neopass } = require('neopass')

const config = {
  /**
   * Configure the topology validator to use its standard patterns.
   */
  // validators: ['topology:standard=true']

  /**
   * Add some patterns to the standard ones.
   */
  validators: [
    {
      plugin: 'topology',
      options: {
        standard: true,
        patterns: [
          /^u+l+u+l+s+$/,   // ululs
          /^u+l+u+l+d+$/,   // ululd
          /^u+l+u+l+d+s+$/, // ululds
        ]
      }
    }
  ]
}

const neo = neopass(config)

const errors = neo.validate('Denver2016') // uld
console.log(errors)
```

Output:

```
[ { name: 'topology',
    msg: 'password matches vulnerable pattern topology' } ]
```

## Configuring Validators

### Short Form

The short-form configuration uses a string to reference the plugin and its options/arguments. In this case, options and arguments can be primitive types such as `number`, `string`, `boolean`, etc.

```typescript
const config = {
  validators: ['length:min=10,max=72']
}
```

```typescript
const config = {
  validators: ['entropy:64']
}
```

```typescript
const config = {
  validators: ['topology:standard=true']
}
```

### Long Form

The long-form configuration uses an object to reference the plugin and its options/arguments. Options and arguments can be objects and arrays, in addition to other types, such as `RegExp`.

```typescript
const config = {
  validators: [{
    plugin: 'length',
    options: {
      min: 10,
      max: 72,
    },
  }]
}
```

```typescript
const config = {
  validators: [{
    plugin: 'entropy',
    args: [ 64 ],
  }]
}
```

```typescript
const config = {
  validators: [{
    plugin: 'topology',
    options: {
      patterns: [
        /^u+l+d+$/,
        /^u+l+s+$/,
        /^l+d+s+$/,
        ...
      ],
    },
  }]
}
```

## Custom Validators

Custom validators can be used by either [authoring a validator plugin](#authoring-a-validator-plugin) or using in-line custom function validators:

```typescript
/**
 * Create a custom validator function.
 */
function customDepth(): IValidator {
  // Create a validator object.
  const validator = {
    // Request depth from password info.
    request: ['depth'],
    // The core validator function.
    exec(depth: number) {
      if (depth < 62) {
        // Validation failure.
        const score = depth / 62
        return [{name: 'custom-depth', msg: 'password not complex enough', score}]
      }
    }
  }

  // Return the validator object.
  return validator
}

// Configure neopass.
const neo = neopass({
  validators: [
    customDepth
  ]
})

const errors = neo.validate('abcdefg')
console.log('errors:', errors)
```

Output:

```
errors: [
  {
    name: 'custom-depth',
    msg: 'password not complex enough',
    score: 0.41935483870967744
  }
]
```

Custom validators can also be used in the [evaluation chain](#the-evaluation-chain).

## Optional Rules

If you want optional rules - that is, rules where some errors are treated as warnings - use the `verify` method which joins validation and evaluation. Validation failures are returned as errors and evaluation failures are returned as warnings.

```typescript
import { neopass, INeoConfig } from 'neopass'

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

const neo = neopass(config)

const result = neo.verify('Denver2016')
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

## Plugins

`neopass` runs on plugins. Generators and validators are all plugins and can be specified as part of the configuration.

Config:

```typescript
import { neopass, INeoConfig } from 'neopass'

import {
  // Generators
  HexGenerator,
  LettersNumbersGenerator,
  RandomGenerator,
  // Validators
  ClassesValidator,
  CommonValidator,
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

  // Configure the validation chain.
  validators: [
    'entropy:64',
    'shannon:32',
    'sequence:4',
    'run:3',
    'topology:standard=true',
  ]
}

const neo = neopass(config)
```

**Generate**

```typescript
const pass = neo.generate(12, 'letters-numbers')
console.log('password:', pass)
```

Output:

```
password: v2mQsx6SKZ3s
```

**Validate**

Validate the generated password:

```typescript
const errors = neo.validate('v2mQsx6SKZ3s')
console.log('errors:', errors)
```

Output:

```
errors: []
```

Validate some other password:

```typescript
const errors = neo.validate('abcdefg777')
console.log('errors:', errors)
```

Output:

```
errors: [
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

### Authoring a Validator Plugin

```typescript
import { IValidator, ValidatorPlugin, IValidatorError } from 'neopass'

/**
 * A simplified version of the LengthValidator plugin
 */
export class SimpleLengthValidator extends ValidatorPlugin {
  // Implement required plugin name as a getter.
  get name() { return 'simple-length' }

  // Message helper.
  get msg() { return 'password too short!' }

  /**
   * This gets called to pass arguments to the plugin. For example,
   *
   *   validators: [ 'simple-length:10' ]
   *
   * will pass `10` to the configure method as the first
   * argument following `options`.
   */
  configure(options: any, min: number): IValidator {
    const validator: IValidator = {
      // Any requested password info will be passed to exec, in order.
      request: ['length'],
      // The validation logic.
      exec: (length: number) => {
        if (length < min) {
          const score = length / min
          // Return one or more error objects.
          return [{ name: this.name, msg: this.msg, score }]
        }
        // No errors! Can be null or undefined.
        return null
      }
    }

    return validator
  }
}
```

Configuration:

```typescript
import { SimpleLengthValidator } from './somewhere'

const neo = neopass({
  plugins: [
    new SimpleLengthValidator()
  ],

  validators: [
    'simple-length:10'
  ]
})

neo.validate('abc')
```

Output:

```
[ { name: 'simple-length',
    msg: 'password too short!',
    score: 0.3 } ]
```

Plugins don't have to be subclasses of `ValidatorPlugin` or instances of classes at all. Any object that conforms to `IPlugin` will do:

```typescript
/**
 * Create an object that implements IPlugin to act as
 * a validator plugin.
 */
const customLength: IPlugin<IValidator> = {
  type: 'validator',
  name: 'custom-length',
  configure(options: any, min: number) {
    const validator = {
      request: ['length'],
      exec(length: number) {
        if (length < min) {
          const score = length / min
          return [{name: 'custom-length', msg: 'password too short!', score}]
        }
      }
    }
    return validator
  }
}

const neo = neopass({
  plugins: [
    customLength,
  ],
  validators: [
    'custom-length:10',
  ]
})

neo.validate('abcdefg')
```

Output:

```
[ { name: 'custom-length',
    msg: 'password too short!',
    score: 0.7 } ]
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

`shannon`: the [Shannon Entropy](https://en.wiktionary.org/wiki/Shannon_entropy) of the password in bits per symbol. Shannon entropy can be thought of as the overall complexity of the password, based on the diversity of symbols it contains.

As a rule, always request the minimum amount of information required to fulfill proper validation. For example:
- if you want to know what the password length is, request `length` and not `password` or `topology`.
- if you want to know which classes are represented, request `classes` and not `topology`.

There are legitimate reasons for a validator to request `password`. For instance, both the `RunValidator` and the `SequenceValidator` use `password` to determine if a password has runs of the same character or multiple characters in sequence. Most of the other validators request `length`, `shannon`, `entropy` and/or `depth`. The `TopologyValidator` requests `topology`. However it's dangerous to blindly trust plugins that request `password` or `topology`. _It's safest to only use validators and generators that you author yourself_.

## Override Configured Chains

The validation and/or evaluation chain defined in the configuration can be overridden by passing a chain definition to validate or evaluate:

```typescript
const config = {
  // Default validators.
  validators: [
    'length:min=10,max=72',
    'classes:and=ul,or=ds',
  ]
}

const neo = neopass(config)

// Create a custom validation chain.
const customValidators = [
  'entropy:64',
  'run:3',
  'sequence:4',
]

// Overide default validators.
const errors = neo.validate('skookum49', customValidators)
console.log('errors:', errors)
```

Output:

```
errors: [ { name: 'entropy',
    msg: 'password is either too short or not complex enough',
    score: 0.7270207033278251 } ]
```

The above also works with the evaluation chain.
