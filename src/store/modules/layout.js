import { setLayoutMune, getLayoutMune } from '@/utils/storage'
import asyncRouter from '@/router/asyncRouter'
import defaultRouter from '@/router/defaultRouter'
import router from '@/router'
import { getRouterMenu, setRouterUrl } from '@/utils/menu'
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
      getRouterMenu(vcode, asyncRouter).forEach(r => router.addRoute(r))
      context.commit('SET_MENU', setRouterUrl([...defaultRouter, ...asyncRouter]))
    },
    RUN_COLLAPSE: function(context) {
      context.commit('SET_COLLAPSE')
    },
  },
}
