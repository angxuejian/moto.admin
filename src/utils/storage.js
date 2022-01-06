
const router = 'USER_ROUTER'
export const setUserRouter = value => localStorage.setItem(router, value)
export const getUserRouter = () => localStorage.getItem(router).split(',')
export const remUserRouter = () => localStorage.removeItem(router)
