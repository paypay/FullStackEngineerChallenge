import React, { memo, useCallback } from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { ADMIN_DASHBOARD } from '../../util/constants';
import logo from '../../assets/logo.svg';
import styles from './home.module.scss';

const Home = () => {
  const dispatch = useDispatch();

  const goToAdminDashboard = useCallback(() => {
    dispatch(push(ADMIN_DASHBOARD));
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <p>Welcome to Thinh Vo's Performance Review Application</p>
        <div className={styles.AppLink} onClick={goToAdminDashboard}>
          Admin Dashboard
        </div>
      </header>
    </div>
  );
};

export default memo(Home);
