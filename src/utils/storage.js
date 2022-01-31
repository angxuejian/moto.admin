
// 缓存用户路由code码
const vcode = 'USER_VCODE'
export const setUserVCode = value => localStorage.setItem(vcode, value)
export const getUserVCode = () => {
  const d = localStorage.getItem(vcode)
  return d ? d.split(',') : []
}
export const remUserVCode = () => localStorage.removeItem(vcode)

// 缓存用户路由菜单
const mune = 'LAYOUT_MUNE'
export const setLayoutMune = value => localStorage.setItem(mune, JSON.stringify(value))
export const getLayoutMune = () => {
  const d = localStorage.getItem(mune)
  return d ? JSON.parse(d) : []
}
export const remLayoutMune = () => localStorage.removeItem(mune)
