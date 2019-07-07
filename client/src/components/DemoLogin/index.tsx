import React from 'react'
import { Dialog, Button } from '@blueprintjs/core'
import styles from './DemoLogin.css'
import api from '~/utils/api'

const login = async (id: number) => {
  const [err] = await api.post('/demo/login/' + id)
  if (!err) {
    location.reload()
  }
}
export default function DemoLogin() {
  return (
    <Dialog title="please login(demo)" isOpen>
      <div className={styles.outer}>
        <p>please choose an account to login</p>
        <Button onClick={() => login(1)} icon="user">
          Admin (id: 1)
        </Button>
        <br />
        <br />
        <Button onClick={() => login(2)} icon="user">
          Non-Admin(id: 2){' '}
        </Button>
        <br />
        <br />
        <Button onClick={() => login(3)} icon="user">
          Non-Admin(id: 3)
        </Button>
      </div>
    </Dialog>
  )
}
