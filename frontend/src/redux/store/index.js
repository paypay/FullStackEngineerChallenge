import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import mainReducer from '../reducers';
import mySaga from '../sagas';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  mainReducer(history),
  compose(
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware))
      : applyMiddleware(routerMiddleware(history), sagaMiddleware),
  ),
);

sagaMiddleware.run(mySaga);
