import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import common from './commonReducers';
import admin from './adminReducers';
import employee from './employeeReducers';

const appReducer = history =>
  combineReducers({
    common,
    admin,
    employee,
    router: connectRouter(history),
  });

const rootReducer = history => (state, action) => {
  return appReducer(history)(state, action);
};

export default rootReducer;
