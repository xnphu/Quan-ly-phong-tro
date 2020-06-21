import { API } from '.';

export default {
  login: ({ username, password }) =>
    API.post('auth/login', {
      username,
      password
    }),
};
