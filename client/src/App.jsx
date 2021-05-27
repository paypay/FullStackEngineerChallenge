import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "pages/Login";
import { randomNumber } from "utils/utils";
import Logout from "pages/logout";
import Dashboard from "pages/Dashboard";

const App = () => {
  const colors = ["#ffd0d2", "#fffdd0", "#d0fffd", "#d0d2ff"];
  const firstGradient = randomNumber(10, 90);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <div
            style={{
              background: `linear-gradient(141deg,${
                colors[randomNumber(0, 4)]
              } ${firstGradient}%, ${colors[randomNumber(0, 4)]})`,
            }}
          >
            <Login />
          </div>
        </Route>
        <Route path="/logout" component={Logout} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
