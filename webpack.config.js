const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: path.resolve(__dirname, 'client', 'src', 'Index.jsx'),
  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(mp3)$/,
        use: ['file-loader'],
      }
    ]
  }
};
