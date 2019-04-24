import { put, call, take, race, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { LOGIN_REQUEST_STATUS, LOGIN_REQUEST_ERROR, LOGIN_EXECUTE_REQUEST, LOGOUT, LOGIN_REQUEST_SUCCESS, SET_AUTH, LOGIN_CLEAR_ERROR } from './login.constants';
import genSalt from '../../auth/salt'
import {hashSync} from 'bcryptjs'
import LoginAPI from './login.api';

export function * authorize ({username, password}) {
  console.log('execute authorize');
  // make flag processing = true
  // We send an action that tells Redux we're sending a request
  yield put({type: LOGIN_REQUEST_STATUS, status: true});
  // We then try to register or log in the user, depending on the request
  try {
    const salt = genSalt(username);
    const hash = hashSync(password, salt);
    const loginApi = new LoginAPI();
    const response = yield loginApi.login(username, hash);
    return response
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    yield put({type: LOGIN_REQUEST_ERROR, error: error.message});
    return;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({type: LOGIN_REQUEST_STATUS, status: false})
  }
}

/**
 * Log in saga
 */
function * loginFlow (request) {
  // And we're listening for `LOGIN_EXECUTE_REQUEST` actions and destructuring its payload
  console.log('aaaaaaaaaaaaaaaaaaaaaa');
  debugger;
  const { username, password } = request.payload.data;
  console.log(username, password);
  // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
  // lead to a race condition. This is unlikely, but just in case, we call `race` which
  // returns the "winner", i.e. the one that finished first
  const winner = yield race({
    auth: call(authorize, {username, password}),
    logout: take(LOGOUT)
  })
  console.log('winner', winner);
  // If `authorize` was the winner...
  if (winner.auth) {
    // ...we send Redux appropiate actions
    yield put({type: SET_AUTH, newAuthState: true}) // User is logged in (authorized)
    yield put({type: LOGIN_REQUEST_SUCCESS, formState: {username: '', password: ''}}) // Clear form
    yield put({type: LOGIN_CLEAR_ERROR}) // Clear form
    yield put(push('/home'));
  }
}

export const loginSagas = [
  takeEvery(LOGIN_EXECUTE_REQUEST, loginFlow),
]