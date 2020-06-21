import { all, takeLatest } from 'redux-saga/effects';
// import { me } from 'AINews/src/store/actions/user';
import {
  ACTION_LOGIN,
  ACTION_REGISTER_WITH_PHONE,
  ACTION_VERIFY_WITH_PHONE,
  ACTION_UPDATE_REGISTER_INFO,
  ACTION_LOGIN_WITH_FACEBOOK,
  REQUEST_LOGIN_ANONYMOUSLY,
  REQUEST_FORGOT_PASSWORD
} from '../constants';
import { createRequestSaga } from '../../utils/RequestSagaUtils';
import AuthAPIs from '../APIs/auth';
import {
  updateAccessToken,
  updateRefreshToken,
  setAnonymousToken
} from '../../utils/RequestSagaUtils/token/actions';
import { updateToken } from '../actions/token';

const requestLogin = createRequestSaga({
  request: AuthAPIs.login,
  key: ACTION_LOGIN,
  onSuccessActionCreators: [updateToken]
});


export default function* authSaga () {
  yield all([
    takeLatest(ACTION_LOGIN, requestLogin),
  ]);
}
