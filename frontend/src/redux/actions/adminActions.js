import {
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAILED,
  LOGOUT_ADMIN,
  CHECK_ADMIN_AUTHENTICATED,
  LOAD_EMPLOYEE_LIST,
  LOAD_EMPLOYEE_LIST_SUCCESS,
  ADD_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_REQUEST,
} from '../actionConstants';

export const loginAdminRequest = ({ email, password }) => ({ type: LOGIN_ADMIN_REQUEST, payload: { email, password } });
export const loginAdminSuccess = () => ({ type: LOGIN_ADMIN_SUCCESS });
export const loginAdminFailed = payload => ({ type: LOGIN_ADMIN_FAILED, payload });
export const logoutAdmin = () => ({ type: LOGOUT_ADMIN });
export const checkAuthenticatedAdmin = () => ({ type: CHECK_ADMIN_AUTHENTICATED });
export const loadEmployeeList = () => ({ type: LOAD_EMPLOYEE_LIST });
export const loadEmployeeListSuccess = employeeList => ({
  type: LOAD_EMPLOYEE_LIST_SUCCESS,
  payload: { employeeList },
});
export const addEmployeeRequest = ({ email, password, fullname, department, title }) => ({
  type: ADD_EMPLOYEE_REQUEST,
  payload: { email, password, fullname, department, title },
});
export const deleteEmployeeRequest = id => ({ type: DELETE_EMPLOYEE_REQUEST, payload: { id } });
