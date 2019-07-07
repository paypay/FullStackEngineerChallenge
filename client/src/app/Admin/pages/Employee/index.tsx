import React from 'react'
import {
  Breadcrumbs,
  IBreadcrumbProps,
  Breadcrumb,
  ButtonGroup,
  Button,
  Dialog,
  Card,
  Icon,
  Spinner,
  Tag
} from '@blueprintjs/core'
import Main from '~/components/Main'
import Loading from '~/components/Loading'
import api from '~/utils/api'
import { RouteComponentProps } from 'react-router'
import styles from './Employee.css'
import EditEmployee from './EditEmployee'
import { showConfirm, showModal, dismiss, showAlert } from '~/components/Modals'
import Assign from './Assign'

interface State {
  isLoading: boolean
  info?: Employee
  reviews: Review[]
}

export default class EmployeePage extends React.PureComponent<
  RouteComponentProps<{ id: string }>,
  State
> {
  state: State = {
    isLoading: true,
    reviews: []
  }

  renderCurrentBreadcrumb = ({ text, ...restProps }: IBreadcrumbProps) => {
    return <Breadcrumb {...restProps}>{text}</Breadcrumb>
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const [err1, info] = await api.get(`/admin/employee/${id}`)
    const [err2, reviews] = await api.get(`/admin/employee/${id}/reviews`)
    if (!err1 && !err2) {
      this.setState({
        info,
        reviews,
        isLoading: false
      })
    }
  }

  editInfo = (e: React.MouseEvent) => {
    const { info } = this.state

    showModal(
      <Dialog title="Edit employee" isOpen onClose={dismiss}>
        <EditEmployee onSaved={this.onSavedEmployee} employee={info!} />
      </Dialog>
    )
  }

  showAssignDialog = (e: React.MouseEvent) => {
    const { reviews, info } = this.state
    showModal(
      <Dialog
        title={`Add an employee to review ${info!.name}`}
        isOpen
        onClose={dismiss}
      >
        <Assign
          onSaved={this.onReviewAdded}
          reviewers={new Set(reviews.map(review => review.reviewer.id))}
          reviewee={info!}
        />
      </Dialog>
    )
  }

  onSavedEmployee = (employee: Employee) => {
    this.setState({
      info: employee
    })
  }

  deleteEmployee = (e: React.MouseEvent) => {
    if (this.state.info!.admin) {
      showAlert({
        message: 'Admin cannot be delted'
      })
      return
    }
    showConfirm({
      message: 'Are you sure to delete this employee?',
      onConfirm: async () => {
        const [err] = await api.delete(
          `/admin/employee/${this.props.match.params.id}`
        )
        if (!err) {
          this.props.history.replace('/')
        }
      }
    })
  }

  onReviewAdded = (review: Review) => {
    this.setState({
      reviews: this.state.reviews.concat(review)
    })
  }

  deleteReview = (review: Review) => {
    showConfirm({
      message: 'Are you sure to unassign this?',
      onConfirm: async () => {
        const [err] = await api.delete(`/admin/review/${review.id}`)
        if (!err) {
          const reviews = this.state.reviews.filter(item => item !== review)
          this.setState({
            reviews
          })
        }
      }
    })
  }

  render() {
    const { isLoading, info, reviews } = this.state
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
                      href: '#/',
                      text: 'All Employees'
                    },
                    {
                      text: `${info!.name}(${info!.employee_id})`
                    }
                  ]}
                />
                <ButtonGroup minimal>
                  <Button icon="edit" onClick={this.editInfo}>
                    Edit
                  </Button>

                  <Button intent="danger" onClick={this.deleteEmployee}>
                    Delete
                  </Button>
                </ButtonGroup>
              </div>

              <div className={styles.reviews}>
                <p>Reviews</p>
                <ButtonGroup>
                  <Button icon="plus" onClick={this.showAssignDialog}>
                    Add Reviewer
                  </Button>
                </ButtonGroup>

                <div className={styles.reviewList}>
                  {reviews.map(review => (
                    <Card
                      interactive
                      key={review.id}
                      className={styles.reviewCard}
                    >
                      <div className={styles.reviewCardHead}>
                        <Icon icon="user" />
                        <span className={styles.reviewerName}>
                          {review.reviewer.name}
                        </span>
                        {review.text ? (
                          <Tag intent="success" className={styles.badge}>
                            done
                          </Tag>
                        ) : (
                          <div className={styles.badge}>
                            <Spinner size={12}></Spinner>
                            <span className={styles.label}>waiting</span>
                          </div>
                        )}
                        <Button
                          minimal
                          intent="danger"
                          className={styles.delete}
                          onClick={() => this.deleteReview(review)}
                        >
                          {review.text ? 'delete' : 'unassign'}
                        </Button>
                      </div>
                      <p className={styles.reviewText}>{review.text}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Loading>
      </Main>
    )
  }
}
