import { LOGIN_EMPLOYEE_SUCCESS, LOGIN_EMPLOYEE_FAILED, LOGOUT_EMPLOYEE } from '../actionConstants';

export const initialState = {
  isAuthenticated: false,
  loginErrorMessage: '',
  loginValues: {
    email: '',
    password: '',
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        error: false,
        loginErrorMessage: '',
      };
    }
    case LOGIN_EMPLOYEE_FAILED: {
      const { loginErrorMessage } = payload;
      return {
        ...state,
        isAuthenticated: false,
        loginErrorMessage,
      };
    }
    case LOGOUT_EMPLOYEE: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    default: {
      return state;
    }
  }
};
