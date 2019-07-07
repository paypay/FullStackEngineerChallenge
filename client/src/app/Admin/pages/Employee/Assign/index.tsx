import React from 'react'
import { Button, MenuItem } from '@blueprintjs/core'
import { Select, ItemPredicate, ItemRenderer } from '@blueprintjs/select'
import styles from './Assign.css'
import api from '~/utils/api'
import { dismiss } from '~/components/Modals'

interface Props {
  reviewee: Employee
  reviewers: Set<number>
  onSaved: (employee: Review) => void
}

interface State {
  allEmployees: Employee[]
  reviewer?: number
  selectedEmployee?: Employee
}

const EmployeeSelect = Select.ofType<Employee>()

export default class Assign extends React.PureComponent<Props, State> {
  state: State = {
    allEmployees: []
  }

  async componentDidMount() {
    const [err, data] = await api.get('admin', '/employees')
    if (!err) {
      this.setState({
        allEmployees: data.list.filter(
          (item: Employee) => item.id !== this.props.reviewee.id
        )
      })
    }
  }

  save = async () => {
    const { selectedEmployee } = this.state
    const { reviewee } = this.props

    const [err, { id }] = await api.post(
      'admin',
      `/employee/${reviewee.id}/reviews`,
      {
        reviewer: selectedEmployee!.id,
        text: ''
      }
    )

    if (!err) {
      dismiss()
      this.props.onSaved({
        reviewee,
        reviewer: selectedEmployee!,
        id,
        text: ''
      })
    }
  }

  predicte: ItemPredicate<Employee> = (query, employee) => {
    return employee.name.includes(query) || employee.employee_id.includes(query)
  }

  select = (item: Employee, e?: React.SyntheticEvent) => {
    this.setState({
      selectedEmployee: item
    })
  }

  renderEmployeeItem: ItemRenderer<Employee> = (
    item: Employee,
    { handleClick }
  ) => {
    return (
      <MenuItem
        active={item === this.state.selectedEmployee}
        disabled={this.props.reviewers.has(item.id)}
        label={`${item.name}(${item.employee_id})`}
        key={item.id}
        onClick={handleClick}
        icon="user"
      />
    )
  }

  render() {
    const { allEmployees, selectedEmployee } = this.state
    return (
      <div className={styles.outer}>
        <EmployeeSelect
          items={allEmployees}
          itemPredicate={this.predicte}
          onItemSelect={this.select}
          itemRenderer={this.renderEmployeeItem}
          filterable={false}
        >
          <Button
            icon="user"
            text={
              selectedEmployee
                ? `${selectedEmployee.name}(${selectedEmployee.employee_id})`
                : '(No selection)'
            }
          />
        </EmployeeSelect>
        <Button
          onClick={this.save}
          intent="success"
          className={styles.save}
          disabled={!selectedEmployee}
        >
          Save
        </Button>
      </div>
    )
  }
}
