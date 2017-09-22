import { firebaseAction } from 'vuexfire'

const getters = {
}

const actions = {
  setCurrentRoomRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('data', ref)
  }),
  setSessionsRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('sessions', ref)
  }),
  setAssetsRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('assets', ref)
  }),
  setPeopleRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('people', ref)
  }),
  setCurrentRoom: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('data', ref)
  }),
  setCurrentUserRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('user', ref)
  })
}

const mutations = {
  SET_CURRENT_ROOM (state, value) {
    state.data = value
  },
  SET_PEOPLE (state, value) {
    state.people = value
  },
  SET_CURRENT_USER (state, value) {
    state.user = value
  },
  SET_SESSIONS (state, value) {
    state.sessions = value
  }
}

const state = {
  data: null,
  sessions: [],
  people: [],
  assets: [],
  user: null
}

export default {
  state,
  mutations,
  getters,
  actions
}
