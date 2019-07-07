import { HashRouter, Switch, Route } from 'react-router-dom'
import Top from './pages/Top'
import Employee from './pages/Employee'
import React, { Fragment } from 'react'
import Header from '~/components/Header'
import Modals, { showAlert } from '~/components/Modals'
import api from '~/utils/api'
import Loading from '~/components/Loading'

interface State {
  isLoading: boolean
  me?: Employee
}
export default class Admin extends React.PureComponent<{}, State> {
  state: State = {
    isLoading: true
  }
  async componentDidMount() {
    const [err, me] = await api.get('/session')
    if (!err) {
      if (!me.admin) {
        showAlert({
          message: 'you are not admin',
          onConfirm: () => {
            location.href = '/'
          }
        })
      } else {
        this.setState({
          me,
          isLoading: false
        })
      }
    }
  }
  render() {
    const { me, isLoading } = this.state
    return (
      <div>
        <Loading isLoading={isLoading}>
          {() => (
            <Fragment>
              <Header admin me={me} />
              <HashRouter>
                <Switch>
                  <Route path="/employee/:id" component={Employee} />
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
