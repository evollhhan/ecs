const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const config = baseConfig(env, argv);
  return {
    entry: {
      app: './src/index.ts'
    },
    mode: argv.mode,
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js'
    },
    devtool: '#eval-source-map',
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json']
    },
    devServer: {
      host: '0.0.0.0',
      port: 3000,
      open: false,
      disableHostCheck: true,
      clientLogLevel: 'error',
      overlay: {
        warnings: false,
        errors: true
      },
      // Uncomment if no error shows.
      quiet: true,
      watchOptions: {
        poll: false
      },
      contentBase: path.join(__dirname, '../static')
    },
    module: {
      rules: config.rules,
    },
    plugins: config.plugins.concat([
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin()
    ])
  }
};
