module.exports = {
  entry: './app/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/js'
  },

  devtool: 'source-map',
  mode: 'development',

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: 'ts-loader'}
    ]
  }
}
