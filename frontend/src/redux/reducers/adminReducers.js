import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_FAILED, LOGOUT_ADMIN, LOAD_EMPLOYEE_LIST_SUCCESS } from '../actionConstants';

export const initialState = {
  isAuthenticated: null,
  loginErrorMessage: '',
  // adminObject: null,
  employeeList: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_ADMIN_SUCCESS: {
      // const { adminObject } = payload;
      return {
        ...state,
        isAuthenticated: true,
        error: false,
        loginErrorMessage: '',
        // adminObject,
      };
    }
    case LOGIN_ADMIN_FAILED: {
      const { loginErrorMessage } = payload;
      return {
        ...state,
        isAuthenticated: false,
        loginErrorMessage,
      };
    }
    case LOGOUT_ADMIN: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case LOAD_EMPLOYEE_LIST_SUCCESS: {
      const { employeeList } = payload;
      return {
        ...state,
        isAuthenticated: true,
        error: false,
        loginErrorMessage: '',
        employeeList,
      };
    }
    default: {
      return state;
    }
  }
};
