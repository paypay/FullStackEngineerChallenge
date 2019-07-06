import { Button } from "@blueprintjs/core";
import React, { useState, useEffect } from "react";
import aixos from "axios";

interface State {
  employeeCount: number;
}
export default class App extends React.PureComponent<{}, State> {
  state: State = {
    employeeCount: 0
  };

  async componentDidMount() {
    const {
      data: { total }
    } = await aixos.get("/api/v1/employee");
    this.setState({
      employeeCount: total
    });
  }

  render() {
    return <p>there are {this.state.employeeCount} employees</p>;
  }
}
