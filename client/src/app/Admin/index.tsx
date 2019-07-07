import { HashRouter, Switch, Route } from "react-router-dom";
import Top from "./pages/Top";
import Employee from "./pages/Employee";
import React from "react";
import Header from "~/components/Header";
import GlobalAlert from "~/components/GlobalAlert";

export default function Admin() {
  return (
    <div>
      <Header title={"RevYou admin"} />
      <HashRouter>
        <Switch>
          <Route path="/employee/:id" component={Employee} />
          <Route path="/" component={Top} />
        </Switch>
      </HashRouter>
      <GlobalAlert />
    </div>
  );
}
