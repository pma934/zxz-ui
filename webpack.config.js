var path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  mode: 'production',
  optimization: { //根据所选项为您运行优化 mode
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  entry: NODE_ENV === 'development' ? './src/main.js' : './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/', //输出的文件夹
    filename: 'zxz-ui.js', //输出的文件名
    library: 'zxz-ui', //引用js文件时创建的全局变量名
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'zxz-ui.css',
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== 'production' ?
          'vue-style-loader' :
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ?
          'vue-style-loader' :
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          process.env.NODE_ENV !== 'production' ?
          'vue-style-loader' :
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
}
