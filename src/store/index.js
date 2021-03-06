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
  SET_ALL_ROOMS (state, value) {
    state.allRooms = value
  },
  ...firebaseMutations
}

const actions = {
  setCurrentSessionRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('session', ref)
  }),
  setAllRoomsRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('allRooms', ref)
  }),
  setUserRoomsRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('userRooms', ref)
  }),
  setUserDetailsRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('userDetails', ref)
  })
}

const state = {
  user: null,
  userDetails: null,
  allRooms: [],
  userRooms: []
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
