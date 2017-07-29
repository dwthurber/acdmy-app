import Vue from 'vue'
import Vuex from 'vuex'

const mutations = {
  AUTH_CHANGED (state, authData) {
    state.authData = authData
  },
  REDIRECT_LOGIN (state) {
    state.route.path = '/login'
  }
}

Vue.use(Vuex)
Vue.config.debug = true

const state = {
  route: {},
  authData: {},
  count: 0
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
