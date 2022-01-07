import { setUserRouter, getUserRouter } from '@/utils/storage'
import { ALL_MENU } from '@/router/menu'

const getUserMenuBar = (router, menu) => {
  const list = []

  const verifyCode = (r, i) => {
    if (i.meta && i.meta.vcode) return r.some(s => i.meta.vcode.includes(s))
    else return true
  }

  menu.forEach(item => {
    if (verifyCode(router, item)) {
      if (item.children) item.children = getUserMenuBar(router, item.children)
      list.push(item)
    }
  })

  return list
}
export default {
  namespaced: true,

  state: {
    ID    : '', // 用户ID
    ROUTER: getUserRouter() || [], // 用户登录后、获取可访问的路由地址
    MENU  : [], // 用户可访问的菜单导航
  },
  mutations: {
    SET_USER_ID    : (state, id) => { state.ID = id },
    SET_USER_ROUTER: (state, router) => { state.ROUTER = router },
    SET_USER_MENU  : (state, menu) => { state.MENU = menu },
  },
  actions: {
    RUN_USER_ID: function(context, ID) {
      context.commit('SET_USER_ID', ID)
    },
    RUN_USER_ROUTER: function(context) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const USER_ROUTER = ['home', 'xx', 'user2']
          context.commit('SET_USER_ROUTER', USER_ROUTER)
          context.dispatch('RUN_USER_MENU', USER_ROUTER)
          // setUserRouter(USER_ROUTER)
          resolve({ success: true })
        }, 2000)
      })
    },
    RUN_USER_MENU: function(context, router) {
      context.commit('SET_USER_MENU', getUserMenuBar(router, ALL_MENU))
    },
  },
}
