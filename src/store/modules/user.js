import { setUserVCode, getUserVCode } from '@/utils/storage'
import store from '../index'
export default {
  namespaced: true,

  state: {
    ID   : '', // 用户ID
    VCODE: getUserVCode() || [], // 用户登录后、获取可访问的路由地址的code码
  },
  mutations: {
    SET_USER_ID   : (state, id) => { state.ID = id },
    SET_USER_VCODE: (state, vcode) => { state.VCODE = vcode; setUserVCode(vcode) },

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
          store.dispatch('LAYOUT/RUN_LAYOUT_MENU', USER_VCODE)
          resolve({ success: true })
        }, 2000)
      })
    },
  },
}
