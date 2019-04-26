# neopass
A password validation and generation tool kit - simple to use yet maximally flexible.

- Password generation
- Password validation
- Password strength
- Passphrase support

"The only good password is a random password of sufficient entropy." - _unknown_

## Under development

This package is currently experimental and the interface is unstable. While the package remains at `0.x.y`, the minor version will be updated when known breaking changes occur.

Currently geared toward English passwords and passphrases.

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

## The Evaluation Chain

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

## Passphrase Detection

Passphrases are long passwords typically comprised of multiple words. These
are considered to be more secure than shorter, mixed-class passwords. If configured,
`neopass` will detect a passphrase and bypass additional validation in the validation chain.

```typescript
import neopass, { INeoConfig } from 'neopass'

const config: INeoConfig = {
  useBuiltinDetectorss: true, // default

  // Configure the passphrase detector for passwords of 20 or more characters.
  passphrase: 'passphrase:20',

  // These are run when validate is called.
  validators: [
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

## Plugins

Config:

```typescript
import neopass, { INeoConfig } from 'neopass'

import {
  // Generators
  LettersNumbersGenerator,
  // Validators
  EntropyValidator,
  ShannonValidator,
  SequenceValidator,
  RunValidator,
} from 'neopass/plugins'

/**
 * Configuration
 */
const config: INeoConfig = {
  useBuiltinGenerators: false,
  useBuiltinValidators: false,

  plugins: [
    LettersNumbersGenerator,
    EntropyValidator,
    ShannonValidator,
    SequenceValidator,
    RunValidator,
  ],

  validators: [
    'entropy:64',
    'shannon:32',
    'sequence:3',
    'run:2',
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
  {
    name: 'entropy',
    msg: 'password is either too short or not complex enough',
    score: 0.8078007814753613,
  },
  {
    name: 'shannon',
    msg: 'password is too simple',
    score: 0.8895122952096924,
  },
  {
    name: 'sequence',
    message: 'password contains at least 1 character sequence(s)'
  },
  {
    name: 'run',
    message: 'password contains at least 1 character run(s)'
  }
]
```
