var path = require('path');

module.exports = {
  entry: './assets/js/app.js',
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.json$/,
        use: 'json-loader' // npm install json-loader
      }
    ]
  }
};
