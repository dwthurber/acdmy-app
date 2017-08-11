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
  SET_CURRENT_ROOM (state, value) {
    state.currentRoom = value
  },
  SET_PEOPLE (state, value) {
    state.people = value
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
  setPeople: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('people', ref)
  })
}

const state = {
  user: null,
  rooms: [],
  currentRoom: null,
  people: []
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
