import React from 'react'
import { ButtonGroup, Button, Tag, Card, Icon } from '@blueprintjs/core'
import Main from '~/components/Main'
import styles from './Top.css'
import api from '~/utils/api'

type Tab = 'to' | 'from'

interface State {
  isLoading: boolean
  selectedTab: Tab
  reviewsReceived: Review[]
}

export default class Top extends React.PureComponent<{}, State> {
  state: State = {
    isLoading: true,
    selectedTab: 'to',
    reviewsReceived: []
  }

  async componentDidMount() {
    const [err, reviewsReceived] = await api.get('/me/reviews/received')
    if (!err) {
      this.setState({
        reviewsReceived
      })
    }
  }

  selectTab = (tab: Tab) => {
    this.setState({
      selectedTab: tab
    })
  }

  render() {
    const { selectedTab, reviewsReceived } = this.state
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
            Reviews sent
          </Button>
        </ButtonGroup>
        <p className={styles.title}>
          {selectedTab === 'to'
            ? 'See what your colleagues think about you'
            : 'How do you think about your colleagues?'}
        </p>
        <div className={styles.reviewList}>
          {reviewsReceived.map(review => (
            <Card key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewCardHead}>
                from <Icon icon="user" />
                <span className={styles.reviewerName}>
                  {review.reviewer.name}
                </span>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </Card>
          ))}
        </div>
      </Main>
    )
  }
}
