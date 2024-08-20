const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{ 
      test: /\.js$|jsx/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
    },
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
      ],
    },
  ],
  },
};

// the babel dependencies were installed using force, watch for broken builds!!!!
