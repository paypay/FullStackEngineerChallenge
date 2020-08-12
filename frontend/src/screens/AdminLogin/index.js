import React, { memo, useCallback, useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import styles from './adminLogin.module.scss';
import { loginAdminRequest, checkAuthenticatedAdmin } from '../../redux/actions';
import { ADMIN_DASHBOARD } from '../../util/constants';

const AdminLogin = () => {
  const dispatch = useDispatch();

  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');

  const loginErrorMessage = useSelector(state => state.admin.loginErrorMessage);
  const isAuthenticated = useSelector(state => state.admin.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuthenticatedAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(push(`/${ADMIN_DASHBOARD}`));
    }
  }, [dispatch, isAuthenticated]);

  const handleEmployeeLogin = useCallback(
    e => {
      e.preventDefault();
      if (!email || !password) {
        return;
      }
      dispatch(loginAdminRequest({ email, password }));
    },
    [email, password, dispatch],
  );

  const handleChangeEmail = useCallback(e => {
    changeEmail(e.target.value);
  }, []);

  const handleChangePassword = useCallback(e => {
    changePassword(e.target.value);
  }, []);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Admin Login</h1>
        <p className={styles.errorMessage}>{loginErrorMessage}</p>
        <Form>
          <Form.Group controlId="formAdminEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChangeEmail} />
          </Form.Group>
          <Form.Group controlId="formAdminPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handleChangePassword} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleEmployeeLogin}>
            Login
          </Button>
        </Form>
      </header>
    </div>
  );
};

export default memo(AdminLogin);
