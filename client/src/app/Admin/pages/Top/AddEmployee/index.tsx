import React from "react";
import { Button } from "@blueprintjs/core";
import Axios from "axios";
import styles from "./AddEmployee.css";
import api from "~/utils/api";

interface Props {
  onCreated: (employee: Employee) => void;
}

type State = Omit<Employee, "id">;

export default class AddEmployee extends React.PureComponent<Props, State> {
  state: State = {
    employee_id: "",
    name: ""
  };

  updateField = ({
    currentTarget: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [name as keyof State]: value
    });
  };

  add = async () => {
    const [err, data] = await api.post("/employees", this.state);
    if (!err) {
      this.props.onCreated(data as Employee);
    }
  };

  isValid() {
    const { name, employee_id } = this.state;
    return name.trim().length > 0 && employee_id.trim().length > 0;
  }

  render() {
    const { employee_id, name } = this.state;

    return (
      <div className={styles.outer}>
        <input
          className="bp3-input"
          type="text"
          placeholder="name"
          name="name"
          onChange={this.updateField}
          required
          value={name}
        />
        <br />
        <br />
        <input
          className="bp3-input"
          type="text"
          placeholder="employ id"
          name="employee_id"
          onChange={this.updateField}
          value={employee_id}
        />
        <br />
        <br />
        <Button
          onClick={this.add}
          intent="success"
          className={styles.save}
          disabled={!this.isValid()}
        >
          Save
        </Button>
      </div>
    );
  }
}
