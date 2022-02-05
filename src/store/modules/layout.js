import { setLayoutMune, getLayoutMune, setLayoutView, getLayoutView } from '@/utils/storage'
import asyncRouter from '@/router/asyncRouter'
import defaultRouter from '@/router/defaultRouter'
import router from '@/router'
import { getRouterMenu, setRouterUrl, setRouterComponent } from '@/utils/menu'
export default {
  namespaced: true,
  state: {
    MENU: [], // 用户可访问的菜单导航
    IS_COLLAPSE: false, // 侧边菜单栏 - 展开或缩放
    KEEP_VIEW: getLayoutView(), // 需要缓存的组件 [{ name: 组件缓存名称, title: 组件显示名称, url: 组件地址 }]
  },
  mutations: {
    SET_MENU: (state, menu) => { state.MENU = menu },
    SET_COLLAPSE: (state) => { state.IS_COLLAPSE = !state.IS_COLLAPSE },
    SET_KEEP_VIEW: (state, { type, item }) => {
      const index = state.KEEP_VIEW.findIndex(s => s.name === item.name)
      if (type === 'add') {
        if (index === -1) state.KEEP_VIEW.push(item)
      } else if (type === 'remove') {
        if (index) state.KEEP_VIEW.splice(index, 1)

        // 当上一页路由和当前要删除的路由一致时，就跳转到最后一次访问的路由
        const { back } = window.history.state
        if (back === item.url) router.push({ path: state.KEEP_VIEW[state.KEEP_VIEW.length - 1].url, replace: true })
        else router.back()
      }
      setLayoutView(state.KEEP_VIEW)
    },
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
    ADD_KEEP_VIEW: function(context, item) {
      context.commit('SET_KEEP_VIEW', { type: 'add', item })
    },
    REM_KEEP_VIEW: function(context, item) {
      context.commit('SET_KEEP_VIEW', { type: 'remove', item })
    },
  },
}
