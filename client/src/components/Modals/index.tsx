import React, { ReactElement } from 'react'
import { Alert } from '@blueprintjs/core'

interface ShowAlertParams {
  message: string
}

interface ShowConfirmParams extends ShowAlertParams {
  onConfirm: () => void
  onCancel?: () => void
}

export let showAlert: (params: ShowAlertParams) => void
export let showConfirm: (params: ShowConfirmParams) => void
export let showModal: (modal: ReactElement) => void
export let dismiss: () => void

interface State {
  modals: ReactElement[]
}
export default class Modals extends React.PureComponent<{}, State> {
  state: State = {
    modals: []
  }

  componentDidMount() {
    showAlert = this.showAlert
    showConfirm = this.showConfirm
    showModal = this.showModal
    dismiss = this.dismiss
  }

  showModal = (modal: ReactElement) => {
    const { modals } = this.state

    this.setState({
      modals: modals.concat(
        React.cloneElement(modal, {
          key: modals.length + 1
        })
      )
    })
  }

  showAlert = (params: ShowAlertParams) => {
    const { modals } = this.state
    this.setState({
      modals: modals.concat(
        <Alert isOpen key={modals.length} onClose={this.dismiss}>
          {params.message}
        </Alert>
      )
    })
  }

  showConfirm = (params: ShowConfirmParams) => {
    const { modals } = this.state
    this.setState({
      modals: modals.concat(
        <Alert
          isOpen
          key={modals.length}
          onClose={this.dismiss}
          onConfirm={params.onConfirm}
          cancelButtonText="cancel"
          intent="danger"
        >
          {params.message}
        </Alert>
      )
    })
  }

  dismiss = () => {
    const modals = this.state.modals.slice(0, -2)
    this.setState({
      modals
    })
  }

  render() {
    return this.state.modals
  }
}
