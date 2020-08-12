import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_ADMIN_REQUEST,
  LOGOUT_ADMIN,
  CHECK_ADMIN_AUTHENTICATED,
  LOAD_EMPLOYEE_LIST,
  ADD_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_REQUEST,
} from '../actionConstants';
import {
  loginAdminSuccess,
  loginAdminFailed,
  authStartLoading,
  authEndLoading,
  loadEmployeeListSuccess,
} from '../actions';
import {
  signInAdmin,
  checkAuthenticatedAdminApi,
  loadEmployeeListApi,
  addEmployeeApi,
  deleteEmployeeApi,
  logoutAdmin,
} from '../../util/api';

export function* loginHandler(action) {
  try {
    const {
      payload: { email, password },
    } = action;

    yield put(authStartLoading());

    yield signInAdmin({ email, password });

    yield put(loginAdminSuccess());
  } catch (e) {
    const loginErrorMessage = e.message || 'Login Error';
    yield put(loginAdminFailed({ loginErrorMessage }));

    const {
      payload: { errorCallback },
    } = action;

    if (errorCallback) {
      errorCallback();
    }
  } finally {
    yield put(authEndLoading());
  }
}

export function* checkAuthenticatedHandler() {
  try {
    yield put(authStartLoading());

    yield call(checkAuthenticatedAdminApi);

    yield put(loginAdminSuccess());
  } catch (e) {
    // No error message here because not coming from Login Form
    yield put(loginAdminFailed({ loginErrorMessage: '' }));
  } finally {
    yield put(authEndLoading());
  }
}

export function* logoutHandler() {
  try {
    yield call(logoutAdmin);
  } catch (e) {
    console.log('logoutAdminHandler error', e); // eslint-disable-line
  }
}

export function* loadEmployeeListHandler() {
  try {
    yield put(authStartLoading());

    yield put(loadEmployeeListSuccess(yield call(loadEmployeeListApi)));
  } finally {
    yield put(authEndLoading());
  }
}

export function* addEmployeeHandler(action) {
  const {
    payload: { email, password, fullname, department, title },
  } = action;

  try {
    yield put(authStartLoading());

    yield addEmployeeApi({ email, password, fullname, department, title });

    yield put(loadEmployeeListSuccess(yield call(loadEmployeeListApi)));
  } finally {
    yield put(authEndLoading());
  }
}

export function* deleteEmployeeHandler(action) {
  const {
    payload: { id },
  } = action;

  try {
    yield put(authStartLoading());

    yield deleteEmployeeApi(id);

    yield put(loadEmployeeListSuccess(yield call(loadEmployeeListApi)));
  } finally {
    yield put(authEndLoading());
  }
}

export default function* authSaga() {
  yield takeEvery(LOGIN_ADMIN_REQUEST, loginHandler);
  yield takeEvery(CHECK_ADMIN_AUTHENTICATED, checkAuthenticatedHandler);
  yield takeEvery(LOGOUT_ADMIN, logoutHandler);
  yield takeEvery(LOAD_EMPLOYEE_LIST, loadEmployeeListHandler);
  yield takeLatest(ADD_EMPLOYEE_REQUEST, addEmployeeHandler);
  yield takeLatest(DELETE_EMPLOYEE_REQUEST, deleteEmployeeHandler);
}
