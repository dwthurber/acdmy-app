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
  SET_USER_ROOMS (state, value) {
    state.rooms = value
  },
  ...firebaseMutations
}

const actions = {
  setUserProfile: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('userProfile', ref)
  }),
  setRooms: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('rooms', ref)
  }),
  setCurrentRoom: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('currentRoom', ref)
  }),
  setUsers: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('users', ref)
  })
}

const state = {
  user: null,
  userProfile: {},
  rooms: [],
  currentRoom: null,
  users: [],
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
