import {
  ACTION_LOGIN,
  ACTION_LOGOUT,
} from '../constants';


export const login = ({ username, password }, callback) => ({
  type: ACTION_LOGIN,
  args: [
    {
      username,
      password
    },
    callback
  ]
});

export const logout = () => ({
  type: ACTION_LOGOUT
});