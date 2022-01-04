import Cookie from 'js-cookie'

const TOKEN = 'moto.token'
export const setToken = value => Cookie.set(TOKEN, value)
export const getToken = () => Cookie.get(TOKEN)
export const remToken = () => Cookie.remove(TOKEN)
