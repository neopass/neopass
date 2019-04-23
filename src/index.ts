import { profile } from './utils/profile'
import neopass from './neopass'

// const ms = profile(() => {
//   // const pass = password(48, 'a')
//   // const pass = '2016'
//   // const pass = 'gc$W#c}]$U!7'
//   // const pass = 'Helcaraxë'
//   // const pass = 'Gwanûr'
//   // const pass = 'Hanstovánen'
//   // const pass = 'Lov3t©cöde'
//   // const pass = 'Lzx3t©tö7f'

//   // const pass = password(20, 'd')
//   // const pass = 'udnkzdjeyhdqwjpo'
//   // const pass = 'udnkzdjey'

//   const pass = 'abcdefghijklmnopqrstuvwxyz'
//   console.log('pass:', pass)
//   const stats = new PasswordStats(pass)
//   console.log('length:', stats.length)
//   console.log('depth:', stats.depth)
//   console.log('topology:', stats.topology)
//   console.log('classes:', stats.classes)
//   console.log('entropy:', stats.entropy)
//   console.log('shannon:', stats.shannon)
//   console.log('bits:', stats.bits)

//   // Lrv3t©cöze
//   // Lov3t©cöde
//   // const pass = password(86, 'ulds')
//   // const stats = new PasswordStats(pass)
//   // stats.length
//   // stats.depth
//   // stats.topology
//   // stats.classes
//   // stats.entropy
//   // stats.shannon
//   // stats.bits

//   // console.log(JSON.stringify(password(100, 's')))

//   // for (let i = 0x80; i <= 0xff; i++) {
//   //   console.log(i, String.fromCodePoint(i))
//   // }
// })

// console.log(`${ms} ms`)

export default neopass

neopass({
  plugins: [
    // new LengthValidator()
  ]
})

const ms = profile(() => {

  // console.log(neopass)
  const result = neopass.validate('abcd', [
    'length:min=10:max=20',
    // {
    //   plugin: 'length',
    //   options: {
    //     min: 10,
    //     max: 20,
    //   },
    // },
  ])
  console.log(result)

  const pass = neopass.generate(20, 'random')
  console.log(pass)

  const r = neopass.generators()
  console.log(r)
})

console.log(`${ms} ms`)

for (let i = 0x1F1E6; i <= 0x1F3ff; i++) {
  const str = String.fromCodePoint(i)
  // console.log(str.length)
  process.stdout.write(String.fromCodePoint(i))
}
