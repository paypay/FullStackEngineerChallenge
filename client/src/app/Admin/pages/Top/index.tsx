import React from "react";
import aixos from "axios";
import { Button, Dialog, Card, Icon } from "@blueprintjs/core";
import Main from "~/components/Main";
import styles from "./Top.css";
import AddEmployee from "./AddEmployee";
import { RouteComponentProps } from "react-router-dom";
import Loading from "~/components/Loading";
import api from "~/utils/api";

interface State {
  employees: {
    total: number;
    list: Employee[];
  };
  isAddingEmployee: boolean;
  isLoading: boolean;
}

export default class Top extends React.PureComponent<
  RouteComponentProps,
  State
> {
  state: State = {
    employees: {
      list: [],
      total: 0
    },
    isAddingEmployee: false,
    isLoading: true
  };

  async componentDidMount() {
    const [error, employees] = await api.get("/employees");
    if (!error) {
      this.setState({
        employees,
        isLoading: false
      });
    }
  }

  showNewEmployDialog = (e: React.MouseEvent) => {
    this.setState({
      isAddingEmployee: true
    });
  };

  hideNewEmployeeDialog = (e?: React.SyntheticEvent<HTMLElement, Event>) => {
    this.setState({
      isAddingEmployee: false
    });
  };

  onCreatedEmployee = (employee: Employee) => {
    const { employees } = this.state;
    this.setState({
      employees: {
        total: employees.total + 1,
        list: employees.list.concat(employee)
      }
    });
    this.hideNewEmployeeDialog();
  };

  goToEmployee = (id: number) => {
    this.props.history.push(`/employee/${id}`);
  };

  render() {
    const { employees, isAddingEmployee, isLoading } = this.state;
    return (
      <Main>
        <Loading isLoading={isLoading}>
          {() => (
            <div>
              <p className={styles.title}>
                There are {employees.total} employees{" "}
                <Button
                  icon="plus"
                  className={styles.add}
                  onClick={this.showNewEmployDialog}
                >
                  Add Employee
                </Button>
              </p>

              <div className={styles.employeeList}>
                {employees.list.map(employee => (
                  <Card
                    interactive
                    className={styles.employeeCard}
                    key={employee.employee_id}
                    onClick={() => this.goToEmployee(employee.id)}
                  >
                    <Icon icon="user" iconSize={50} color={"#eee"} />
                    <div className={styles.employeeInfo}>
                      {employee.name}
                      <br />
                      <small>{employee.employee_id}</small>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Loading>
        <Dialog
          title="Add new employee"
          isOpen={isAddingEmployee}
          onClose={this.hideNewEmployeeDialog}
        >
          <AddEmployee onCreated={this.onCreatedEmployee} />
        </Dialog>
      </Main>
    );
  }
}
