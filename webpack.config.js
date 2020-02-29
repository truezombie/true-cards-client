const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = (env = {}) => {
  const { mode = 'development' } = env;
  const isProd = mode === 'production';
  const isDev = mode === 'development';

  return {
    devtool: isProd ? 'none' : 'inline-source-map',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? '[name].[contenthash].js' : '[name].bundle.js',
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },

    mode: isProd ? 'production' : isDev && 'development',

    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          loader: ['babel-loader'],
        },
      ],
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'true-cards',
        template: 'public/index.html',
      }),
      new HardSourceWebpackPlugin(),
    ],

    devServer: {
      open: true,
      port: 3000,
      historyApiFallback: true,
    },
  };
};
