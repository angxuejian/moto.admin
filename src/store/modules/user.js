import { setUserVCode, getUserVCode, setUserMune, getUserMune } from '@/utils/storage'
import { ALL_MENU } from '@/router/menu'

/**
 * getUserMenuBar
 * @param {array} code 可访问的路由地址code码
 * @param {array} menu 所有路由地址
 * @returns 过滤出 可访问的路由地址 + 无需权限的路由地址
 */
const getUserMenuBar = (code, menu) => {
  const list = []
  const verifyCode = (r, i) => {
    if (i.meta && i.meta.vcode) return r.some(s => i.meta.vcode.includes(s))
    else return true
  }
  menu.forEach(item => {
    if (verifyCode(code, item)) {
      if (item.children) item.children = getUserMenuBar(code, item.children)
      list.push(item)
    }
  })

  return list
}
export default {
  namespaced: true,

  state: {
    ID   : '', // 用户ID
    VCODE: getUserVCode() || [], // 用户登录后、获取可访问的路由地址的code码
    MENU : getUserMune() || [], // 用户可访问的菜单导航
  },
  mutations: {
    SET_USER_ID   : (state, id) => { state.ID = id },
    SET_USER_VCODE: (state, vcode) => { state.VCODE = vcode; setUserVCode(vcode) },
    SET_USER_MENU : (state, menu) => { state.MENU = menu; setUserMune(menu) },
  },
  actions: {
    RUN_USER_ID: function(context, ID) {
      context.commit('SET_USER_ID', ID)
    },
    RUN_USER_VCODE: function(context) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const USER_VCODE = ['home', 'xx', 'user2']
          context.commit('SET_USER_VCODE', USER_VCODE)
          context.dispatch('RUN_USER_MENU', USER_VCODE)
          resolve({ success: true })
        }, 2000)
      })
    },
    RUN_USER_MENU: function(context, vcode) {
      context.commit('SET_USER_MENU', getUserMenuBar(vcode, ALL_MENU))
    },
  },
}
