import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction, firebaseMutations } from 'vuexfire'
// import users from '@/store/modules/users'

Vue.use(Vuex)
Vue.config.debug = true

const mutations = {
  SET_USER (state, value) {
    state.user = value
  },
  ...firebaseMutations
}

const actions = {
  setUserProfile: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('userProfile', ref)
  }),
  setRooms: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('rooms', ref)
  })
}

const state = {
  user: null,
  userProfile: {},
  rooms: [],
  count: 0
}

export default new Vuex.Store({
  state,
  // getters,
  actions,
  // modules: {
  //   users
  // },
  mutations
})
