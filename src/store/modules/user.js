
export default {
  namespaced: true,

  state: {
    ID    : '', // 用户ID
    ROUTER: ['XXX', 'xxx'], // 用户登录后、获取可访问的路由地址
  },
  mutations: {
    SET_USER_ID: (state, ID) => { state.ID = ID },
  },
  actions: {
    RUN_USER_ID: function(context, ID) {
      context.commit('SET_USER_ID', ID)
    },
  },
}
