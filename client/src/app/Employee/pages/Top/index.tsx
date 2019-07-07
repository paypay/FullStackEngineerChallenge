import React, { Fragment } from 'react'
import {
  ButtonGroup,
  Button,
  Tag,
  Card,
  Icon,
  Spinner,
  Dialog
} from '@blueprintjs/core'
import Main from '~/components/Main'
import EditReview from './EditReview'
import styles from './Top.css'
import api from '~/utils/api'
import { showModal, dismiss } from '~/components/Modals'

type Tab = 'to' | 'from'

interface State {
  isLoading: boolean
  selectedTab: Tab
  reviewsReceived: Review[]
  reviewsToSend: Review[]
}

export default class Top extends React.PureComponent<{}, State> {
  state: State = {
    isLoading: true,
    selectedTab: 'to',
    reviewsReceived: [],
    reviewsToSend: []
  }

  async componentDidMount() {
    const [[err1, reviewsReceived], [err2, reviewsToSend]] = await Promise.all([
      api.get('/me/reviews/received'),
      api.get('/me/reviews/tosend')
    ])
    if (!err1 && !err2) {
      this.setState({
        reviewsReceived,
        reviewsToSend
      })
    }
  }

  selectTab = (tab: Tab) => {
    this.setState({
      selectedTab: tab
    })
  }

  onSaved = (review: Review) => {
    const { reviewsToSend } = this.state
    const index = reviewsToSend.findIndex(item => item.id === review.id)
    const list = reviewsToSend.slice(0)
    list.splice(index, 1, review)
    this.setState({
      reviewsToSend: list
    })
  }

  editReview = (review: Review) => {
    showModal(
      <Dialog
        title={`Edit your review to ${review.reviewee.name}`}
        isOpen
        onClose={dismiss}
      >
        <EditReview review={review} onSaved={this.onSaved} />
      </Dialog>
    )
  }

  renderTab() {
    const { selectedTab, reviewsReceived, reviewsToSend } = this.state

    if (selectedTab === 'to') {
      return (
        <Fragment>
          <p className={styles.title}>
            See what your colleagues think about you
          </p>
          <div className={styles.reviewList}>
            {reviewsReceived.map(review => (
              <Card key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewCardHead}>
                  from <Icon icon="user" />
                  <span className={styles.reviewUsername}>
                    {review.reviewer.name}
                  </span>
                </div>
                <p className={styles.reviewText}>{review.text}</p>
              </Card>
            ))}
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <p className={styles.title}>
            How do you think about your colleagues?
          </p>
          <div className={styles.reviewList}>
            {reviewsToSend.map(review => (
              <Card key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewCardHead}>
                  to <Icon icon="user" />
                  <span className={styles.reviewUsername}>
                    {review.reviewee.name}
                  </span>
                  {review.text ? (
                    <Tag intent="success" className={styles.badge}>
                      done
                    </Tag>
                  ) : (
                    <div className={styles.badge}>
                      <Spinner size={12}></Spinner>
                      <span className={styles.label}>awaiting your action</span>
                    </div>
                  )}
                  <Button
                    minimal
                    intent="primary"
                    icon="edit"
                    className={styles.action}
                    onClick={() => this.editReview(review)}
                  >
                    {review.text ? 'edit' : 'compose'}
                  </Button>
                </div>
                <p className={styles.reviewText}>{review.text}</p>
              </Card>
            ))}
          </div>
        </Fragment>
      )
    }
  }

  render() {
    const { selectedTab, reviewsReceived, reviewsToSend } = this.state
    const reviewsToCompose = reviewsToSend.filter(item => !item.text)
    return (
      <Main>
        <ButtonGroup>
          <Button
            icon="inbox"
            active={selectedTab === 'to'}
            onClick={() => this.selectTab('to')}
          >
            Reviews received({reviewsReceived.length})
          </Button>
          <Button
            icon="annotation"
            active={selectedTab === 'from'}
            onClick={() => this.selectTab('from')}
          >
            Reviews sent{' '}
            {reviewsToCompose.length ? (
              <Tag intent="danger">{reviewsToCompose.length}</Tag>
            ) : (
              `(${reviewsToSend.length})`
            )}
          </Button>
        </ButtonGroup>
        {this.renderTab()}
      </Main>
    )
  }
}
