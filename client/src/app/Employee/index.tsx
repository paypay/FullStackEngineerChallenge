import { HashRouter, Switch, Route } from 'react-router-dom'
import Top from './pages/Top'
import React, { Fragment } from 'react'
import Header from '~/components/Header'
import Modals from '~/components/Modals'
import Loading from '~/components/Loading'
import api from '~/utils/api'

interface State {
  isLoading: boolean
  me?: Employee
}
export default class Employee extends React.PureComponent<{}, State> {
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
    const { me, isLoading } = this.state
    return (
      <div>
        <Loading isLoading={isLoading}>
          {() => (
            <Fragment>
              <Header title={'RevYou'} me={me} />
              <HashRouter>
                <Switch>
                  <Route path="/" component={Top} />
                </Switch>
              </HashRouter>
            </Fragment>
          )}
        </Loading>
        <Modals />
      </div>
    )
  }
}
