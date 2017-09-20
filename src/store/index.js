import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction, firebaseMutations } from 'vuexfire'
import room from '@/store/modules/room'

Vue.use(Vuex)
Vue.config.debug = true

const mutations = {
  SET_USER (state, value) {
    state.user = value
  },
  SET_USER_ROOMS (state, value) {
    state.userRooms = value
  },
  SET_CURRENT_SESSION (state, value) {
    state.session = value
  },
  ...firebaseMutations
}

const actions = {
  setCurrentSessionRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('session', ref)
  })
}

const state = {
  user: null,
  userRooms: [],
  session: null,
  route: null
}

export default new Vuex.Store({
  state,
  // getters,
  actions,
  modules: {
    room
  },
  mutations
})
