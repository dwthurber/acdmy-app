import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'
import users from '@/store/modules/users'

Vue.use(Vuex)
Vue.config.debug = true

const mutations = {
  SET_USER (state, value) {
    state.user = value
  },
  ...firebaseMutations
}

const state = {
  user: null,
  count: 0
}

export default new Vuex.Store({
  state,
  modules: {
    users
  },
  mutations
})
