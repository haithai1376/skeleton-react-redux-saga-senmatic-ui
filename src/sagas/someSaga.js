import { all, put, takeEvery } from 'redux-saga/effects';
import {
  UPDATE_COUNT_REQUEST,
  updateCountSuccess,
  updateCountFailure,
} from '../actions';

function* updateCount(action) {
  try {
    console.log('updateCount')
    const { newCount } = action.payload;
    debugger;
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() >= 0.3 ? resolve() : reject();
      }, 250);
    });
    
    yield put(updateCountSuccess(newCount));
  } catch (e) {
    yield put(updateCountFailure());
  }
}

export default function* () {
  yield all([
    takeEvery(UPDATE_COUNT_REQUEST, updateCount),
  ]);
}
