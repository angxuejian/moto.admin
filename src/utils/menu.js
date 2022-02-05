/**
 * 获取可访问的路由
 * @param {array} code 可访问的路由地址code码
 * @param {array} menu 所有路由地址
 * @returns 过滤出 可访问的路由地址 + 无需权限的路由地址
 */
export const getRouterMenu = (code, menu) => {
  const list = []
  const verifyCode = (r, i) => {
    if (i.meta && i.meta.vcode) return r.some(s => i.meta.vcode.includes(s))
    else return true
  }
  menu.forEach(item => {
    if (verifyCode(code, item)) {
      if (item.children) {
        item.children = getRouterMenu(code, item.children)
        item.redirect = item.children[0].path
      }
      if (item.meta && item.meta.component) item.component = () => import('../' + item.meta.component)
      list.push(item)
    }
  })

  return list
}

/**
 * 循环路由菜单，拼接 path地址
 * @param {*} menu 菜单路由
 * @param {*} parentPath 上级 path
 * @returns 拼接完成path路由菜单
 *
 * 为了直接使用 element中的menu组件，而拼接 path地址
 */
export const setRouterUrl = (menu = [], parentPath = '') => {
  const list = []

  menu.forEach(item => {
    // if (!item.hidden) {
    if (!item.meta) item.meta = {}
    item.meta.url = joinUrl(item.path, parentPath)
    if (item.children && item.children.length) item.children = setRouterUrl(item.children, item.meta.url)
    list.push(item)
    // }
  })

  return list
}

/**
 * 拼接方法
 */
const joinUrl = (path, parentPath) => {
  // return !parentPath || parentPath === '/' ? path : [parentPath, path].join('')
  return path.startsWith('/') ? path : path ? [parentPath, path].join('') : parentPath
}

/**
 * 引入路由组件地址
 * @param {array} menu 本地缓存路由地址
 * @returns 路由引入组件方法后的 路由地址
 */
export const setRouterComponent = (menu = []) => {
  const list = []
  menu.forEach(item => {
    if (item.meta && item.meta.component) item.component = () => import('../' + item.meta.component)
    if (item.children && item.children.length) item.children = setRouterComponent(item.children)
    list.push(item)
  })
  return list
}
