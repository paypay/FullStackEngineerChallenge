import { fork } from "redux-saga/effects";
import { sagas as loginSagas } from "stores/sagas/login";
import { sagas as logOutSaga } from "stores/sagas/logout";
import { sagas as employeeSaga } from "stores/sagas/employee";
import { sagas as feedbackSaga } from "stores/sagas/feedback";

export default function* rootSaga() {
  yield fork(loginSagas);
  yield fork(employeeSaga);
  yield fork(feedbackSaga);
  yield fork(logOutSaga);
}
