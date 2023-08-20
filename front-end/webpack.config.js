const webpack = require('webpack')
const path = require("path")

module.exports = {
  target: 'node',
  mode: 'production',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: "./src/index.js",
  output: {
    filename: "output.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /express\/lib/,
      path.resolve(__dirname, './node_modules'),
      {
        'ejs': 'ejs'
      }
    )
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  }
}
