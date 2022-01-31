import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'  // 导航颜色 #29d
import { getToken, remToken } from '@/utils/cookie'
import { remUserVCode, remLayoutMune } from '@/utils/storage'
NProgress.configure({ showSpinner: false }) // 进度条配置
const setting = require('./setting')

router.beforeEach(async (to, from, next) => {
  document.title = `${setting.name} - ${to.meta.title}`
  const token = getToken()
  NProgress.start()

  if (token) {
    if (to.path === '/login') next('/') // 有token，去首页
    else {
      const verifyCode = store.getters.USER_VCODE
      if (verifyCode.length) {
        if (to.meta.vcode?.length) {
          const r = to.meta.vcode.find(s => verifyCode.includes(s))
          if (!r) next('/403') // 用户没有该路由权限，去403
          else next() // 该路由已有权限，显示页面
        } else next() // 该路由不需要权限，显示页面
      } else {
        const { success } = await store.dispatch('USER/RUN_USER_VCODE')
        if (success) next({ path: to.path, replace: true })  // 没有用户可访问的路由，请求接口后，重新刷新当前页面
        else {
          remToken()
          remUserVCode()
          remLayoutMune()
          next(`/login?redirect=${to.path}`) // 用户可访问路由为空，请重新登录
        }
      }
    }
  } else {
    if (to.path === '/login') next() // 重定向后，显示页面
    else next(`/login?redirect=${to.path}`) // 没有token，去登录
  }
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
