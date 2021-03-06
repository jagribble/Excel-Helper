require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
// const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: `${__dirname}/components/index.js`,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    }],
  },
  plugins: [
    new WebpackNotifierPlugin({ alwaysNotify: true, contentImage: path.join(__dirname, 'logo.png') }),
  ],
  output: {
    filename: 'build.js',
    path: `${__dirname}/public/js`,
  },
  externals: {
    fs: 'commonjs fs',
  },

};
