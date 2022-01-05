import {
  createStore,
} from 'vuex'

import USER from './modules/user' // 用户信息模块
import ROUTER from './modules/router' // 路由管理
import getters from './getters'

export default createStore({
  getters,
  modules: { USER, ROUTER },
})
