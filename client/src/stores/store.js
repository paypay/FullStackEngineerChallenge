import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import creatrSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = creatrSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
export default store;
