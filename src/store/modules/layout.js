import { setLayoutMune, getLayoutMune } from '@/utils/storage'
import asyncRouter from '@/router/asyncRouter'
import defaultRouter from '@/router/defaultRouter'
import router from '@/router'
import { getRouterMenu, setRouterUrl } from '@/utils/menu'
export default {
  namespaced: true,
  state     : {
    MENU: getLayoutMune() || [], // 用户可访问的菜单导航
  },
  mutations: {
    SET_LAYOUT_MENU: (state, menu) => { state.MENU = menu; setLayoutMune(menu) },

  },
  actions: {
    RUN_LAYOUT_MENU: function(context, vcode) {
      getRouterMenu(vcode, asyncRouter).forEach(r => router.addRoute(r))
      context.commit('SET_LAYOUT_MENU', setRouterUrl([...defaultRouter, ...asyncRouter]))
    },
  },
}
