import { combineReducers } from "redux";
import loginReducer from "stores/slices/login";
import employeesReducer from "stores/slices/employee";
import feedbackReducer from "stores/slices/feedback";
import logoutReducer from "stores/slices/logout";

const appReducer = combineReducers({
  loginReducer,
  employeesReducer,
  feedbackReducer,
  logoutReducer,
});

const rootReducer = (state, action) => {
  if (action.type.indexOf("logout") !== -1)
    return appReducer(undefined, action);
  return appReducer(state, action);
};

export default rootReducer;
