import React from 'react'
import styles from './Header.css'
import {
  Popover,
  MenuItem,
  Position,
  Button,
  Menu,
  Divider
} from '@blueprintjs/core'
import api from '~/utils/api'

interface Props {
  admin?: boolean
  me: Employee
}

const logout = async () => {
  const [err] = await api.post('/logout')
  if (!err) {
    location.reload()
  }
}

const goToTop = () => {
  location.href = '/'
}

const goToAdmin = () => {
  location.href = '/admin.html'
}

export default function Header({ admin, me }: Props) {
  return (
    <div className={styles.header}>
      <a className={styles.logo} href="#/">
        {admin ? 'RevYou Admin' : 'RevYou'}
      </a>
      {!admin && !!me.admin && (
        <Button
          icon="take-action"
          text="admin"
          onClick={goToAdmin}
          minimal
          intent="danger"
        />
      )}
      {admin && (
        <Button
          icon="home"
          text="home"
          onClick={goToTop}
          minimal
          intent="none"
        />
      )}
      <Popover
        className={styles.menu}
        content={
          <Menu>
            <MenuItem icon="home" text="home" onClick={goToTop} />
            {!!me.admin && (
              <MenuItem icon="take-action" text="admin" onClick={goToAdmin} />
            )}
            <Divider />
            <MenuItem icon="log-out" text="log out" onClick={logout} />
          </Menu>
        }
        position={Position.BOTTOM}
      >
        <Button
          text={me.name + (me.admin ? '(admin)' : '')}
          minimal
          rightIcon="chevron-down"
        />
      </Popover>
    </div>
  )
}
