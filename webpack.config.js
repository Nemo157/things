module.exports = {
  context: __dirname + '/src',
  entry: {
    'client': [
      './client/renderer.js',
      './client/updater.js',
    ],
    'server': [
      './server/index.js',
    ],
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/ },
    ]
  },
  devtool: '#inline-source-map',
}
