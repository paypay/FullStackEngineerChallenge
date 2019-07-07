import { HashRouter, Switch, Route } from "react-router-dom";
import Top from "./pages/Top";
import React from "react";
import Header from "~/components/Header";

export default function Employee() {
  return (
    <div>
      <Header title={"RevYou"} />
      <HashRouter>
        <Switch>
          <Route path="/" component={Top} />
        </Switch>
      </HashRouter>
    </div>
  );
}
