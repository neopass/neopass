
module.exports = {
  include: [
    'src/**/*.ts'
  ],
  // exclude: [
  //   'src/spec'
  // ],
  extension: [
    '.ts'
  ],
  require: [
    'ts-node/register'
  ],
  reporter: [
    'lcov',
    'text-summary'
  ],
  sourceMap: true,
  instrument: true
}
