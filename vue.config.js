// const path = require('path')
// const getPath = file => {
//   return path.resolve(__dirname, file)
// }

module.exports = {

  // 区分不同环境下的路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // 生产环境下不校验 eslint
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 配置跨越代理
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },

  // configureWebpack: config => {
  //   console.log(config, '-这是什么')
  // }
}