import {
  LOGIN_EMPLOYEE_REQUEST,
  LOGIN_EMPLOYEE_SUCCESS,
  LOGIN_EMPLOYEE_FAILED,
  LOGOUT_EMPLOYEE,
} from '../actionConstants';

export const loginEmployeeRequest = (email, password) => ({
  type: LOGIN_EMPLOYEE_REQUEST,
  payload: { email, password },
});
export const loginEmployeeSuccess = () => ({ type: LOGIN_EMPLOYEE_SUCCESS });
export const loginEmployeeFailed = payload => ({ type: LOGIN_EMPLOYEE_FAILED, payload });
export const logoutEmployee = () => ({ type: LOGOUT_EMPLOYEE });
