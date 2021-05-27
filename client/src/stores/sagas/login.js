import { put, takeLatest } from "redux-saga/effects";
import { loginSuccess, loginFailed, loginAction } from "stores/slices/login";
import { doLogin, doGet } from "utils/request";

function* loginSaga({ payload: requestData }) {
  const accessToken = localStorage.getItem("accessToken");
  const apiPoint = accessToken ? doGet("/me") : doLogin("/login", requestData);
  try {
    const res = yield apiPoint;
    yield put(loginSuccess(res));
  } catch (err) {
    yield put(loginFailed(err.message));
  }
}

export function* sagas() {
  yield takeLatest(loginAction, loginSaga);
}
