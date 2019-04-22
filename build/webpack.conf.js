const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const webpackConfig = {
  entry: {
    app: './src/index.ts'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].bundle.[hash].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }
    ] 
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html'
    }),
  ]
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Load development env...')
  const { entry, plugins } = webpackConfig;
  webpackConfig.entry.app = ['./build/dev-client', entry.app]
  webpackConfig.output.publicPath = '/'
  webpackConfig.devtool = '#cheap-module-eval-source-map',
  webpackConfig.plugins = [
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),    
    ...plugins
  ]
}

module.exports = webpackConfig
