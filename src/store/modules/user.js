import { setUserVCode, getUserVCode, setUserMune, getUserMune } from '@/utils/storage'
import asyncRouter from '@/router/asyncRouter'
import defaultRouter from '@/router/defaultRouter'
import router from '@/router'

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

/**
 * 拼接方法
 */
const joinUrl = (path, parentPath) => {
  return path.startsWith('/') ? path : path ? [parentPath, path].join('') : parentPath
}

/**
 * 循环路由菜单，拼接 path地址
 * @param {*} menu 菜单路由
 * @param {*} parentPath 上级 path
 * @returns 拼接完成path路由菜单
 *
 * 为了直接使用 element中的menu组件，而拼接 path地址
 */
const setRouterUrl = (menu = [], parentPath = '') => {
  const list = []

  menu.forEach(item => {
    if (!item.hidden) {
      if (!item.meta) item.meta = {}
      item.meta.url = joinUrl(item.path, parentPath)
      if (item.children && item.children.length) item.children = setRouterUrl(item.children, item.meta.url)
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
    SET_USER_VCODE: (state, vcode) => { state.VCODE = vcode }, // setUserVCode(vcode) },
    SET_USER_MENU : (state, menu) => { state.MENU = menu }, // setUserMune(menu) },

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
      getUserMenuBar(vcode, asyncRouter).forEach(r => router.addRoute(r))
      context.commit('SET_USER_MENU', setRouterUrl([...defaultRouter, ...asyncRouter]))
    },
  },
}
