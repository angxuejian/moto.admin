import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'  // 导航颜色 #29d
import { getToken } from '@/utils/cookie'
NProgress.configure({ showSpinner: false }) // 进度条配置
const setting = require('./setting')

router.beforeEach((to, from, next) => {
  document.title = `${setting.name} - ${to.meta.title}`
  const token = getToken()
  NProgress.start()

  if (to.path === '/login') {
    next() // 是登录页，显示页面
  } else {
    if (token) {
      const verify = store.getters.USER_ROUTER
      if (verify.length) {
        if (to.meta.vcode?.length) {
          const r = to.meta.vcode.find(s => verify.includes(s))
          if (!r) next('/403') // 用户没有该路由权限，去403
        } else next() // 该路由不需要权限，显示页面
      } else {
        next('/403') // 用户没有可访问的路由，去403
      }
    } else {
      next(`/login?redirect=${to.path}`) // 没有token，去登录
    }
  }
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
