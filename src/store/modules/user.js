import { setUserRouter, getUserRouter } from '@/utils/storage'
export default {
  namespaced: true,

  state: {
    ID      : '', // 用户ID
    ROUTER  : getUserRouter() || [], // 用户登录后、获取可访问的路由地址
    MENU_BAR: [], // 用户可访问的菜单导航
  },
  mutations: {
    SET_USER_ID    : (state, ID) => { state.ID = ID },
    SET_USER_ROUTER: (state, router) => { state.ROUTER = router },
  },
  actions: {
    RUN_USER_ID: function(context, ID) {
      context.commit('SET_USER_ID', ID)
    },
    RUN_USER_ROUTER: function(context) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const USER_ROUTER = ['home', 'xx']
          context.commit('SET_USER_ROUTER', USER_ROUTER)
          setUserRouter(USER_ROUTER)
          resolve({ success: true })
        }, 2000)
      })
    },
  },
}
