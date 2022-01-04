import router from './router'
// import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'  // 导航颜色 #29d
import { getToken } from '@/utils/cookie'
NProgress.configure({ showSpinner: false }) // 进度条配置
const setting = require('./setting')

router.beforeEach((to, from, next) => {
  document.title = `${setting.name} - ${to.meta.title}`
  const token = getToken()
  NProgress.start()
  console.log(token, to, '---')

  if (to.path === '/login') {
    next()
  } else {
    if (token) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
