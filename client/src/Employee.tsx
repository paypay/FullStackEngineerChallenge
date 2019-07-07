import React from 'react'
import ReactDOM from 'react-dom'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import './css/app.css'
import EmployeeApp from './app/Employee'

ReactDOM.render(<EmployeeApp />, document.querySelector('#root'))

if ((module as any).hot) {
  ;(module as any).hot.accept('./Employee', () => {
    const NewApp = require('./Employee')
    ReactDOM.render(<NewApp.default />, document.querySelector('#root'))
  })
}
