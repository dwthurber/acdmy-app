import Vue from 'vue'
import Vuex from 'vuex'

const mutations = {
  setUser (state, value) {
    state.user = value
  }
}

Vue.use(Vuex)
Vue.config.debug = true

const state = {
  user: null,
  count: 0
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
