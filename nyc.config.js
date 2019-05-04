
module.exports = {
  include: [
    'src/**/*.ts'
  ],
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
