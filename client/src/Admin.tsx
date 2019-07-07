import React from "react";
import ReactDOM from "react-dom";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./css/app.css";
import Admin from "./app/Admin";

ReactDOM.render(<Admin />, document.querySelector("#root"));

if ((module as any).hot) {
  (module as any).hot.accept("./Admin", () => {
    const NewApp = require("./Admin");
    ReactDOM.render(<NewApp.default />, document.querySelector("#root"));
  });
}
