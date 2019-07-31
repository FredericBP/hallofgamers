// CHARGER LES PLUGINS WEBPACK
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// INSTRUCTIONS POUR WEBPACK
module.exports = {
  entry: [
    './src/index.tsx',
    './src/assets/sass/styles.scss'
  ],
  output: {
    filename: './assets/js/bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './assets/css/styles.css',
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader?-url'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico|pdf)$/i, 
        loader: "file-loader",
        options:{
          name:"assets/files/[name].[ext]"
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json', '.scss']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyPlugin([
      { from: './src/assets/lib/font-awesome', to: './assets/lib/font-awesome' },
      { from: './src/assets/lib/tinymce', to: './assets/lib/tinymce' },
      { from: './server/database', to: './server/database' },
      { from: './server/hall-of-gamers-server.js', to: './hall-of-gamers-server.js' }
    ])
  ],
  devServer: {
    contentBase: './dist'
  }
};