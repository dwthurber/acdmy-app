import { firebaseAction } from 'vuexfire'

const getters = {
  users: state => state.users
}

const actions = {
  setUsersRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
    bindFirebaseRef('users', ref)
  })
}

const mutations = {
}

const state = {
  users: []
}

export default {
  state,
  mutations,
  getters,
  actions
}
