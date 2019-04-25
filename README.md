# neopass
A password validation and generation tool kit

"The only good password is a random password of sufficient entropy." - Unknown

## Under development

This package is currently experimental and the interface is unstable. While the package remains at `0.x.y`, the minor version will be updated when known breaking changes occur.

## Basics

### Password Generation

```typescript
import neopass, { INeoConfig } from 'neopass'

const config: INeoConfig = {
  useBuiltinGenerators: true, // default
}

neopass(config)

const pass1 = neopass.generate(12, 'random')
console.log(pass1)

const pass2 = neopass.generate(12, 'letters-numbers')
console.log(pass2)
```

Output:

```
|6Tc/]>4KY:5
WIW71lZEuUsN
```

#### Registered Generators

A list of registered generators can be obtained with the following call:

```typescript
  neopass.generators()
```

Output:

```
[
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
console.log(errors)
```

Output:

```
[
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

The evaluation chain reports a password's strength based on configured validators.

```typescript
import neopass, { INeoConfig } from 'neopass'

const config: INeoConfig = {
  useBuiltinValidators: true, // default

  // These are run when validate is called.
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

const strength = neopass.evaluate('Spokane')
console.log(strength)
```

Output:

```
{
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

**Generate:**

```typescript
const pass = neopass.generate(12, 'letters-numbers')
console.log('pass:', pass)
```

Output:

```
pass: v2mQsx6SKZ3s
```

***Validate:***

```typescript
const errors = neopass.validate('v2mQsx6SKZ3s')
console.log('errors:', errors)
```

Output:

```
errors: []
```

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
