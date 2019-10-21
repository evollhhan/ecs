const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = (env, argv) => {
  const IS_PROD = argv.mode === 'production';
  return {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        oneOf: [
          {
            resourceQuery: /raw/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },
          {
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[hash:base64:4]_[local]'
                  }
                }
              },
              'sass-loader'
            ]
          }
        ]
      }
    ],
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': IS_PROD ? '"production"' : '"development"'
      }),
      new FriendlyErrorsPlugin()
    ]
  }
};
