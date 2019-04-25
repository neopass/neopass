# neopass
A password validation and generation tool kit

"The only good password is a random password of sufficient entropy." - Unknown

## Under development

This package is experimental and the interface is unstable. While the package remains at `0.x.y`, the minor version will be updated when known breaking changes occur. Otherwise the patch version will be updated for changes which are not known to break existing functionality.

## Basics

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
