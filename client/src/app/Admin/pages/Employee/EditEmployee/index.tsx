import React from "react";
import { Button } from "@blueprintjs/core";
import styles from "./EditEmployee.css";
import api from "~/utils/api";

interface Props {
  employee: Employee;
  onSaved: (employee: Employee) => void;
}

type State = Omit<Employee, "id">;

export default class EditEmployee extends React.PureComponent<Props, State> {
  state: State = {
    employee_id: this.props.employee.employee_id,
    name: this.props.employee.name
  };

  updateField = ({
    currentTarget: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [name as keyof State]: value
    });
  };

  save = async () => {
    const data = {
      ...this.state,
      id: this.props.employee.id
    };
    const [err] = await api.put("/employee/" + this.props.employee.id, {
      ...this.state,
      id: this.props.employee.id
    });

    if (!err) {
      this.props.onSaved(data);
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
          value={name}
          required
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
          onClick={this.save}
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
