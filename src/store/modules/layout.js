import { setLayoutMune, getLayoutMune } from '@/utils/storage'
import asyncRouter from '@/router/asyncRouter'
import defaultRouter from '@/router/defaultRouter'
import router from '@/router'
import { getRouterMenu, setRouterUrl, setRouterComponent } from '@/utils/menu'
export default {
  namespaced: true,
  state: {
    MENU: [], // 用户可访问的菜单导航
    IS_COLLAPSE: false, // 侧边菜单栏 - 展开或缩放
  },
  mutations: {
    SET_MENU: (state, menu) => { state.MENU = menu },
    SET_COLLAPSE: (state) => { state.IS_COLLAPSE = !state.IS_COLLAPSE },
  },
  actions: {
    RUN_MENU: function(context, vcode) {
      const asyncVCodeRouter = getRouterMenu(vcode, asyncRouter)
      asyncVCodeRouter.forEach(r => router.addRoute(r))

      const menu = setRouterUrl([...defaultRouter, ...asyncVCodeRouter])
      context.commit('SET_MENU', menu)
      setLayoutMune({ asyncVCodeRouter, menu })

      console.log('计算权限路由')
    },
    RUN_COLLAPSE: function(context) {
      context.commit('SET_COLLAPSE')
    },
    RUN_STORAGE_MENU: function(context) {
      return new Promise((resolve) => {
        const storageMenu = getLayoutMune()
        setRouterComponent(storageMenu.asyncVCodeRouter).forEach(r => router.addRoute(r))

        context.commit('SET_MENU', storageMenu.menu)
        resolve({ success: true })

        console.log('读取缓存路由----')
      })
    },
  },
}
