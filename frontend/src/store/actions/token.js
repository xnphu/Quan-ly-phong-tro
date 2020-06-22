import { ACTION_UPDATE_TOKEN, ACTION_LOGOUT } from '../constants';

export function updateToken (token) {
  return {
    type: ACTION_UPDATE_TOKEN,
    payload: {
      token
    }
  }
}

export function removeToken () {
  return {
    type: ACTION_LOGOUT
  }
}