import React from 'react'
import { Button, Label, Checkbox } from '@blueprintjs/core'
import styles from './EditEmployee.css'
import api from '~/utils/api'
import { dismiss } from '~/components/Modals'

interface Props {
  employee: Employee
  onSaved: (employee: Employee) => void
}

type State = Omit<Employee, 'id'>

export default class EditEmployee extends React.PureComponent<Props, State> {
  state: State = {
    ...this.props.employee
  }

  updateField = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [currentTarget.name as keyof State]:
        currentTarget.name === 'admin'
          ? currentTarget.checked
          : currentTarget.value
    })
  }

  save = async () => {
    const data = {
      ...this.state,
      id: this.props.employee.id
    }
    const [err] = await api.put('/admin/employee/' + this.props.employee.id, {
      ...this.state,
      id: this.props.employee.id
    })

    if (!err) {
      dismiss()
      this.props.onSaved(data)
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
          onClick={this.save}
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
