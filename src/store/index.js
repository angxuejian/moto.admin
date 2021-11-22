import {
  createStore,
} from 'vuex'

import USER from './modules/user' // 用户信息模块
import getters from './getters'

export default createStore({
  getters,
  modules: { USER },
})
