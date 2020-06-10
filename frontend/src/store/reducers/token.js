import { ACTION_UPDATE_TOKEN } from '../constants';

const initialState = {
  token: ''
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ACTION_UPDATE_TOKEN) {
    const { token }  = payload;
    return { ...state, token };
  }
  return state;
};