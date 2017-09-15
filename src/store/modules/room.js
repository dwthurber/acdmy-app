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
  })
}

const mutations = {
  SET_CURRENT_ROOM (state, value) {
    state.data = value
  },
  SET_PEOPLE (state, value) {
    state.people = value
  }
}

const state = {
  data: {},
  sessions: [],
  people: [],
  assets: []
}

export default {
  state,
  mutations,
  getters,
  actions
}
