const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env = {}) => {
  const { mode = 'development' } = env;
  const isProd = mode === 'production';
  const isDev = mode === 'development';

  return {
    devtool: isProd ? 'none' : 'inline-source-map',

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: isProd ? '[name].[contenthash].js' : '[name].bundle.js',
      publicPath: '/',
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

    optimization: isProd
      ? {
          splitChunks: {
            chunks: 'all',
          },
          minimize: true,
          minimizer: [
            new TerserPlugin({
              include: /\/includes/,
            }),
          ],
        }
      : {},

    plugins: [
      new HtmlWebpackPlugin({
        title: 'true-cards',
        template: 'public/index.html',
      }),
    ],

    devServer: {
      host: '0.0.0.0',
      port: 5000,
      historyApiFallback: true,
    },
  };
};
