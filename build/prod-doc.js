const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.config');

//
// CONST
// ---
const PATH = p => path.resolve(__dirname, p);
const PATH_DIST = PATH('../docs');

module.exports = (env, argv) => {
  const conf = baseConfig(env, argv);
  const { rules, plugins } = conf;

  plugins.push(
    new HtmlWebPackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:4].css'
    })
  );

  // Export Config
  return {
    entry: './src/index.ts',
    mode: argv.mode,
    output: {
      path: PATH_DIST,
      filename: '[name].js',
      publicPath: '/ecs/'
    },
    resolve: {
      extensions: ['.js', '.ts', '.json']
    },
    module: {
      rules
    },
    plugins
  }
};