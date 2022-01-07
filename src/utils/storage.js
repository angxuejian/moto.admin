
const router = 'USER_ROUTER'
export const setUserRouter = value => localStorage.setItem(router, value)
export const getUserRouter = () => {
  const d = localStorage.getItem(router)
  return d ? d.split(',') : []
}
export const remUserRouter = () => localStorage.removeItem(router)
