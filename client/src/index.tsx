import React from "react";
import ReactDOM from "react-dom";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./css/app.css";
import App from "./App";

ReactDOM.render(<App />, document.querySelector("#root"));

if ((module as any).hot) {
  (module as any).hot.accept("./App.tsx", () => {
    const NewApp = require("./App");
    ReactDOM.render(<NewApp.default />, document.querySelector("#root"));
  });
}
