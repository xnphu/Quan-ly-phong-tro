import { ACTION_UPDATE_TOKEN } from '../constants';

export function updateToken (token) {
  return {
    type: ACTION_UPDATE_TOKEN,
    payload: {
      token
    }
  }
}
