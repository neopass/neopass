import { profile } from './utils/profile'
import neopass from './neopass'

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
  ])

  console.log(result)
})

console.log(`${ms} ms`)
