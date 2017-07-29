import * as types from './mutation-types'

export const changeAuth = ({ dispatch, state }, authData) => {
  dispatch(types.AUTH_CHANGED, authData)
}
