import React from 'react'
import { ButtonGroup, Button } from '@blueprintjs/core'
import Main from '~/components/Main'
import styles from './Top.css'

type Tab = 'to' | 'from'

interface State {
  isLoading: boolean
  selectedTab: Tab
}

export default class Top extends React.PureComponent<{}, State> {
  state: State = {
    isLoading: true,
    selectedTab: 'to'
  }

  async componentDidMount() {}

  selectTab = (tab: Tab) => {
    this.setState({
      selectedTab: tab
    })
  }

  render() {
    const { selectedTab } = this.state
    return (
      <Main>
        <ButtonGroup>
          <Button
            icon="inbox"
            active={selectedTab === 'to'}
            onClick={() => this.selectTab('to')}
          >
            Reviews received
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
      </Main>
    )
  }
}
