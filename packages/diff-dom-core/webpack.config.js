const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: "./lib/index.ts",
  output: {
    library: 'window.Diff',
    libraryTarget: 'var',
    libraryTarget: 'assign',
    path: __dirname,
    filename: "dist/diff.js"
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts?$/,
      use: {
        loader: 'ts-loader'
      }
    }]
  },

  resolve: {
    // alias: {
    //   '@common': path.resolve(__dirname, '../../common/'),
    //   'src': path.resolve(__dirname, 'src'),
    // },
    extensions: [".ts", ".json"],
    plugins: [new TsconfigPathsPlugin({
      // configFile: __dirname + '/tsconfig.json',
    })]
  },
};