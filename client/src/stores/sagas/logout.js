import { put, takeLatest } from "redux-saga/effects";
import { logOut, logOutFailed, logOutSuccess } from "stores/slices/logout";
import { doGet } from "utils/request";

function* logOutSaga() {
  try {
    const res = yield doGet("/logout");
    yield put(logOutSuccess(res));
  } catch (err) {
    yield put(logOutFailed(err.message));
  }
}

export function* sagas() {
  yield takeLatest(logOut, logOutSaga);
}
