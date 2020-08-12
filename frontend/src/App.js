import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './redux/store';
import RoutingComponent from './appWrappers/RoutingComponent';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RoutingComponent />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
