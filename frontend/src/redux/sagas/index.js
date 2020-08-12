import { all, call } from 'redux-saga/effects';
import adminSaga from './adminSaga';

export default function* rootSaga() {
  yield all([call(adminSaga)]);
}
