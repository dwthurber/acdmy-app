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
