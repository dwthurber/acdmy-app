import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'

Vue.use(Vuex)
Vue.config.debug = true

const mutations = {
  setUser (state, value) {
    state.user = value
  },
  setRoomId (state, value) {
    state.roomid = value
  },
  updateUsers (state, value) {
    state.users = value
  },
  ...firebaseMutations
}

const state = {
  user: null,
  users: null,
  roomid: null,
  count: 0
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
