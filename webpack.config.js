module.exports = {
    entry: __dirname + "/client/App.js",
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
      rules: [
        {
         test: /\.css$/,
         use: [
            'style-loader',
            'css-loader'
          ],
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  }
