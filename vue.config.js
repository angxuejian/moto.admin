
module.exports = {

  // 区分不同环境下的路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // 生产环境下不校验 eslint
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 配置跨越代理
  devServer: {
    open: true,
    before: require('./src/mock/main'),
  },

  // configureWebpack: config => {
  //   console.log(config, '-这是什么')
  // }
}
