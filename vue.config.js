module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/carManagement'
    : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.114.166.149/',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
