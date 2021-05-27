import { put, takeLatest } from "redux-saga/effects";
import {
  getEmployees,
  fetchFailed,
  fetchSuccess,
  setEmployee,
  addEmployee,
  updateEmployee,
  setSuccessMessage,
  deleteEmployee,
} from "stores/slices/employee";
import { doGet, doPost, doPut, doDelete } from "utils/request";

const employeeSagas = {
  *getEmployeeSaga() {
    try {
      const res = yield doGet("/employees");
      yield put(fetchSuccess(res));
    } catch (err) {
      yield put(fetchFailed(err.message));
    }
  },
  *addEmployee({ payload: requestData }) {
    try {
      const res = yield doPost("/employee", requestData);
      yield put(setEmployee(res));
    } catch (err) {
      yield put(fetchFailed(err.message));
    }
  },
  *updateEmployee({ payload: requestData }) {
    try {
      const { employeeId, ...rest } = requestData;
      const res = yield doPut(`/employee/${employeeId}`, { ...rest });
      yield put(setSuccessMessage(res));
    } catch (err) {
      yield put(fetchFailed(err.message));
    }
  },
  *deleteEmployee({ payload: requestData }) {
    try {
      const { employeeId } = requestData;
      const res = yield doDelete(`/employee/${employeeId}`);
      yield put(setSuccessMessage(res));
    } catch (err) {
      yield put(fetchFailed(err.message));
    }
  },
};

export function* sagas() {
  yield takeLatest(getEmployees, employeeSagas.getEmployeeSaga);
  yield takeLatest(addEmployee, employeeSagas.addEmployee);
  yield takeLatest(updateEmployee, employeeSagas.updateEmployee);
  yield takeLatest(deleteEmployee, employeeSagas.deleteEmployee);
}
