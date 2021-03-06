module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  lintOnSave:false,
  devServer: {
    host: '0.0.0.0',
    port: 8083,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: false
  },
  }
}

