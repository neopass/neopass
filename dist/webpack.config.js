// https://webpack.js.org/guides/author-libraries/
const path = require('path');

module.exports = {
  entry: './dist/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'neopass.js',
    library: 'neopass',
    libraryExport: 'neopass',
    libraryTarget: 'umd'
  },
  externals: {},
  stats: { warnings: false }
};
