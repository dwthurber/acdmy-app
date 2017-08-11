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
  SET_ROOMS (state, value) {
    state.rooms = value
  },
  ...firebaseMutations
}

const actions = {
  setRooms: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('rooms', ref)
  }),
  setUsersRooms: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('usersRooms', ref)
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
  usersRooms: [],
  rooms: [],
  currentRoom: null,
  users: []
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
