import React, { ReactElement } from "react";
import { Alert } from "@blueprintjs/core";

interface ShowAlertParams {
  message: string;
}

interface ShowConfirmParams extends ShowAlertParams {
  onConfirm: () => void;
  onCancel?: () => void;
}

export let showAlert: (params: ShowAlertParams) => void;
export let showConfirm: (params: ShowConfirmParams) => void;

interface State {
  alerts: ReactElement[];
}
export default class GlobalAlert extends React.PureComponent<{}, State> {
  state: State = {
    alerts: []
  };

  componentDidMount() {
    showAlert = this.showAlert;
    showConfirm = this.showConfirm;
  }

  showAlert = (params: ShowAlertParams) => {
    const { alerts } = this.state;
    this.setState({
      alerts: alerts.concat(
        <Alert isOpen key={alerts.length} onClose={this.dismiss}>
          {params.message}
        </Alert>
      )
    });
  };

  showConfirm = (params: ShowConfirmParams) => {
    const { alerts } = this.state;
    this.setState({
      alerts: alerts.concat(
        <Alert
          isOpen
          key={alerts.length}
          onClose={this.dismiss}
          onConfirm={params.onConfirm}
          cancelButtonText="cancel"
          intent="danger"
        >
          {params.message}
        </Alert>
      )
    });
  };

  dismiss = () => {
    const alerts = this.state.alerts.slice(0, -2);
    this.setState({
      alerts
    });
  };

  render() {
    return this.state.alerts;
  }
}
