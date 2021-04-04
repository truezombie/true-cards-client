const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const { mode = 'development' } = argv;
  const isProd = mode === 'production';
  const isDev = mode === 'development';

  return {
    devtool: isProd ? undefined : 'inline-source-map',

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
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
          exclude: [/node_modules/],
          loader: 'ts-loader',
        },
      ],
    },

    optimization: isProd
      ? {
          splitChunks: {
            cacheGroups: {
              default: false,
              vendors: false,

              // vendor chunk
              vendor: {
                // name of the chunk
                name: 'vendor',

                // async + async chunks
                chunks: 'all',

                // import file path containing node_modules
                test: /node_modules/,

                // priority
                priority: 20,
              },

              // common chunk
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                priority: 10,
                reuseExistingChunk: true,
                enforce: true,
              },
            },
          },
          minimize: true,
          minimizer: [
            new TerserPlugin(),
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
