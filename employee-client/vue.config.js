const path = require('path')
const name = 'employee manage system'

module.exports = {
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  pwa: {
    name: name
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].title = name
      return args
    })
  }
}
