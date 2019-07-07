import React from 'react'
import { Button, Label, Checkbox } from '@blueprintjs/core'
import Axios from 'axios'
import styles from './AddEmployee.css'
import api from '~/utils/api'
import { dismiss } from '~/components/Modals'

interface Props {
  onCreated: (employee: Employee) => void
}

type State = Omit<Employee, 'id'>

export default class AddEmployee extends React.PureComponent<Props, State> {
  state: State = {
    employee_id: '',
    name: '',
    admin: false
  }

  updateField = ({
    currentTarget: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [name as keyof State]: value
    })
  }

  add = async () => {
    const [err, data] = await api.post('/admin/employees', this.state)
    if (!err) {
      dismiss()
      this.props.onCreated(data as Employee)
    }
  }

  isValid() {
    const { name, employee_id } = this.state
    return name.trim().length > 0 && employee_id.trim().length > 0
  }

  render() {
    const { employee_id, name, admin } = this.state

    return (
      <div className={styles.outer}>
        <Label>
          Name:
          <input
            className={`bp3-input ${styles.input}`}
            type="text"
            placeholder="name"
            name="name"
            onChange={this.updateField}
            value={name}
            required
          />
        </Label>
        <Label>
          employ id:
          <input
            className={`bp3-input ${styles.input}`}
            type="text"
            placeholder="employ id"
            name="employee_id"
            onChange={this.updateField}
            value={employee_id}
          />
        </Label>
        <Checkbox checked={admin} onChange={this.updateField} name="admin">
          Admin
        </Checkbox>
        <Button
          onClick={this.add}
          intent="success"
          className={styles.save}
          disabled={!this.isValid()}
        >
          Save
        </Button>
      </div>
    )
  }
}
