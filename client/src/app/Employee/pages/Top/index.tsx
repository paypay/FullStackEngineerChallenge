import React from "react";
import aixos from "axios";
import Header from "~/components/Header";
import { ButtonGroup, Button } from "@blueprintjs/core";
import Main from "~/components/Main";

interface State {
  employeeCount: number;
}
export default class Top extends React.PureComponent<{}, State> {
  state: State = {
    employeeCount: 0
  };

  async componentDidMount() {
    const {
      data: { total }
    } = await aixos.get("/api/v1/employees");
    this.setState({
      employeeCount: total
    });
  }

  render() {
    return (
      <Main>
        <ButtonGroup>
          <Button icon="inbox">Reviews to me</Button>
          <Button icon="annotation">Reviews from me</Button>
        </ButtonGroup>
      </Main>
    );
  }
}
