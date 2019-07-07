import React from 'react'
import { Button, Dialog, Card, Icon, Tag } from '@blueprintjs/core'
import Main from '~/components/Main'
import styles from './Top.css'
import AddEmployee from './AddEmployee'
import { RouteComponentProps } from 'react-router-dom'
import Loading from '~/components/Loading'
import api from '~/utils/api'
import { showModal, dismiss } from '~/components/Modals'

interface State {
  employees: {
    total: number
    list: Employee[]
  }
  isLoading: boolean
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
    isLoading: true
  }

  async componentDidMount() {
    const [error, employees] = await api.get('/admin/employees')
    if (!error) {
      this.setState({
        employees,
        isLoading: false
      })
    }
  }
  onCreatedEmployee = (employee: Employee) => {
    const { employees } = this.state
    this.setState({
      employees: {
        total: employees.total + 1,
        list: employees.list.concat(employee)
      }
    })
  }

  goToEmployee = (id: number) => {
    this.props.history.push(`/employee/${id}`)
  }

  addEmploy = () => {
    showModal(
      <Dialog title="Add new employee" isOpen onClose={dismiss}>
        <AddEmployee onCreated={this.onCreatedEmployee} />
      </Dialog>
    )
  }
  render() {
    const { employees, isLoading } = this.state
    return (
      <Main>
        <Loading isLoading={isLoading}>
          {() => (
            <div>
              <p className={styles.title}>
                There are {employees.total} employees{' '}
                <Button
                  icon="plus"
                  className={styles.add}
                  onClick={this.addEmploy}
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
                    <Icon icon="user" iconSize={50} color={'#eee'} />
                    <div className={styles.employeeInfo}>
                      {employee.name}
                      {!!employee.admin && (
                        <Tag className={styles.badge}>admin</Tag>
                      )}
                      <br />
                      <small>{employee.employee_id}</small>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Loading>
      </Main>
    )
  }
}
