import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import feedbackReducer from './feedbackReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: userReducer,
  feedback: feedbackReducer,
});
