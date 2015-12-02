require('babel-polyfill')
require('babel-register')({ presets: ['es2015'], ignore: /node_modules|dist/ })
require('./src/server/dev')
