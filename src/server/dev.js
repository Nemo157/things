import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'
import webpackConfig from '../../webpack.config.js'

webpackConfig.entry.client.unshift('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server')
webpackConfig.entry.server.unshift('webpack/hot/poll?1000')
webpackConfig.output.publicPath = 'http://localhost:8080/dist/'
;(webpackConfig.plugins || (webpackConfig.plugins = [])).unshift(new webpack.HotModuleReplacementPlugin())

var clientConfig = Object.assign({}, webpackConfig)
clientConfig.entry = { client: clientConfig.entry.client }

var serverConfig = Object.assign({}, webpackConfig)
serverConfig.output = Object.assign({}, serverConfig.output)
serverConfig.output.library = true
serverConfig.output.libraryTarget = 'commonjs2'
serverConfig.target = 'node'
serverConfig.entry = { server: serverConfig.entry.server }

var server
const serverCompiler = webpack(serverConfig)
serverCompiler.watch({ hot: true }, (err, stats) => {
  if (err) {
    console.error(err)
  } else {
    console.log(stats.toString({ colors: true, chunks: false }))
    if (!server) {
      server = require('../../dist/server.js').init(9231)
    }
  }
})

const clientCompiler = webpack(clientConfig)

const webpackServer = new webpackDevServer(clientCompiler, {
  hot: true,
  inline: true,
  proxy: {
    '*': 'http://localhost:9231',
  },
  filename: 'client.js',
  publicPath: '/dist/',
  stats: {
    colors: true,
    chunks: false,
  },
}).listen(8080)
