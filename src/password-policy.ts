// import { Range } from './types'
const { pullFromClass } = require('./utils/pull')

interface IMinMax {
  min: number
  max?: number
  msg?: string
}

const _policy = {
  evaluate: [
    'strength'
  ],
  validate: [
    'plugin1:20:true',
    'plugin2:min=10:max=20',
    {
      plugin: 'plugin3',
      args: [20, true],
      options: {
        doStuff: true
      },
    },
    {
      request: ['password', 'topology'],
      validator(pass: string, topo: string): string[] {
        return ['error']
      },
    },
  ]
}

const policy = {
  passphrases: {
    minLength: 20,
    patterns: [
      /(u|l)/,
      /s/,
    ]
  },
  _password: [
    'passphrase:20',
    'sequence:4',
    'run:3',
    'reject-words',
  ],
  password: {
    passphrase: 'passphrase:20',
    reject: [
      // Detect sequences, e.g., 'abcd', '6789'.
      'sequence:4',
      // Detect runs, e.g., 'ddd', '777'.
      'run:3',
      //
      'words:common',
    ],
  },
  words: {
    reject: ['words:common'],
  },
  length: {
    min: 10,
    max: 128,
  },
  depth: {
    min: 62,
  },
  topology: {
    reject: [
      'topo:common',
      /^ul{1,6}d{1,4}$/,
    ],
  },
  classes: {
    require: [
      {
        name: 'uppercase',
        pattern: /u/,
        msg: 'password requres at least one upper-case letter',
      },
      {
        name: 'lowercase',
        pattern: /l/,
        msg: 'password requres at least one lower-case letter',
      },
      {
        name: 'digit-special',
        pattern: /(d|s)/,
        msg: 'password requres at least one digit or special character (!, @, #, $, %, etc.)',
      },
    ],
    reject: [
      /z/,
    ],
  },
  shannon: {
    min: 3,
  },
}

export interface IPasswordPolicy {
  length: IMinMax
}

export class PasswordPolicy implements IPasswordPolicy {
  public length: IMinMax = { min: 10, max: 128 }

  // public topology: TopoChar[] = ['u', 'l', 'd']

}
