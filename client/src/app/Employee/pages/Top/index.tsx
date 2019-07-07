import React from 'react'
import aixos from 'axios'
import Header from '~/components/Header'
import { ButtonGroup, Button } from '@blueprintjs/core'
import Main from '~/components/Main'
import api from '~/utils/api'

interface State {
  isLoading: boolean
  me?: Employee
}
export default class Top extends React.PureComponent<{}, State> {
  state: State = {
    isLoading: true
  }

  async componentDidMount() {
    const [err, me] = await api.get('/session')
    if (!err) {
      this.setState({
        me,
        isLoading: false
      })
    }
  }

  render() {
    return (
      <Main>
        <ButtonGroup>
          <Button icon="inbox">Reviews to me</Button>
          <Button icon="annotation">Reviews from me</Button>
        </ButtonGroup>
      </Main>
    )
  }
}
