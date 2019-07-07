import React from "react";
import {
  Breadcrumbs,
  IBreadcrumbProps,
  Breadcrumb,
  ButtonGroup,
  Button,
  Dialog
} from "@blueprintjs/core";
import Main from "~/components/Main";
import Loading from "~/components/Loading";
import api from "~/utils/api";
import { RouteComponentProps } from "react-router";
import styles from "./Employee.css";
import EditEmployee from "./EditEmployee";
import { showConfirm } from "~/components/GlobalAlert";

interface State {
  isEditingEmployee: boolean;
  isLoading: boolean;
  info?: Employee;
}

export default class EmployeePage extends React.PureComponent<
  RouteComponentProps<{ id: string }>,
  State
> {
  state: State = {
    isEditingEmployee: false,
    isLoading: true
  };

  renderCurrentBreadcrumb = ({ text, ...restProps }: IBreadcrumbProps) => {
    return <Breadcrumb {...restProps}>{text}</Breadcrumb>;
  };

  async componentDidMount() {
    const [err, info] = await api.get(
      `/employee/${this.props.match.params.id}`
    );
    if (!err) {
      this.setState({ info, isLoading: false });
    }
  }

  showEditEmployDialog = (e: React.MouseEvent) => {
    this.setState({
      isEditingEmployee: true
    });
  };

  hideEditEmployeeDialog = (e?: React.SyntheticEvent<HTMLElement, Event>) => {
    this.setState({
      isEditingEmployee: false
    });
  };

  onSavedEmployee = (employee: Employee) => {
    this.hideEditEmployeeDialog();
    this.setState({
      info: employee
    });
  };

  delete = async () => {
    const [err] = await api.delete(`/employee/${this.props.match.params.id}`);
    if (!err) {
      this.props.history.replace("/");
    }
  };

  confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    showConfirm({
      message: "Are you sure to delete this employee?",
      onConfirm: this.delete
    });
  };

  render() {
    const { isLoading, info, isEditingEmployee } = this.state;
    return (
      <Main>
        <Loading isLoading={isLoading}>
          {() => (
            <div>
              <div className={styles.title}>
                <Breadcrumbs
                  currentBreadcrumbRenderer={this.renderCurrentBreadcrumb}
                  items={[
                    {
                      href: "#/",
                      text: "All Employees"
                    },
                    {
                      text: `${info!.name}(${info!.employee_id})`
                    }
                  ]}
                />
                <ButtonGroup minimal>
                  <Button icon="edit" onClick={this.showEditEmployDialog}>
                    Edit
                  </Button>
                  <Button
                    icon="delete"
                    intent="danger"
                    onClick={this.confirmDelete}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          )}
        </Loading>
        <Dialog
          title="Edit employee"
          isOpen={isEditingEmployee}
          onClose={this.hideEditEmployeeDialog}
        >
          <EditEmployee onSaved={this.onSavedEmployee} employee={info!} />
        </Dialog>
      </Main>
    );
  }
}
