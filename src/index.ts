import { profile } from './utils/profile'
import { neopass } from './neopass'

export default neopass

neopass({
  validators: [
    {
      plugin: 'topology',
      options: {
        // shannon: 64,
        entropy: 96,
        standard: true,
        patterns: [/^u+l+u+l+d+s+$/],
      },
    },
  ],
  plugins: [
    // new LengthValidator()
  ],
  evaluators: [
    {
      weight: 0.9,
      validators: [
        'depth:95',
      ],
    },
    {
      weight: 0.5,
      validators: [
        'shannon: 64',
      ],
    },
  ],
})

const ms = profile(() => {

  // // console.log(neopass)
  // // Abcd1$laaa7zyxw
  // const result = neopass.validate('LosAangeles2019!', [
  //   // 'length:min=10:max=20',
  //   // 'depth:62',
  //   // 'entropy:64',
  //   // 'shannon:32',
  //   // 'sequence:3',
  //   // 'classes:and=ul,or=ds',
  //   // 'run:2',
  //   /* {
  //     plugin: 'topology',
  //     options: {
  //       // shannon: 64,
  //       entropy: 96,
  //       standard: true,
  //       patterns: [/^u+l+u+l+d+s+$/],
  //     },
  //   }, */
  // ])
  // console.log(result)

  const result = neopass.evaluate('abcdefghijA1$34')
  console.log(result)
})

console.log(`${ms} ms`)

const mb = process.memoryUsage().heapUsed / 1024**2
console.log(mb.toFixed(2) + ' mb')
