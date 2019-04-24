
import {all} from 'redux-saga/effects'
import { loginSagas } from '../scenes/Login/login.sagas';
import someSaga from './someSaga';

export default function * root () {
  yield all([
    someSaga(),
    ...loginSagas
  ]);
}