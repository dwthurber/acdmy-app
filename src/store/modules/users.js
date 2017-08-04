import { firebaseAction } from 'vuexfire'

const getters = {
  users: state => state.users,
  rooms: state => state.rooms
}

const actions = {
  // setUserProfile: firebaseAction(({ bindFirebaseRef }, { ref }) => {
  //   bindFirebaseRef('userProfile', ref)
  // }),
  setRoomsRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    bindFirebaseRef('rooms', ref)
  })
}

const mutations = {
}

const state = {
  rooms: [],
  userProfile: {}
}

export default {
  state,
  mutations,
  getters,
  actions
}
