
export default {
  namespaced: true,

  state: {
    ID: '', // 用户ID
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
