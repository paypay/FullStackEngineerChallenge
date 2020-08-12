import React, { memo, useEffect, useCallback } from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthenticatedAdmin } from '../../redux/actions';
import { HOME, MANAGE_EMPLOYEES, ADMIN_DASHBOARD } from '../../util/constants';
import styles from './adminDashboard.module.scss';

const Home = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.admin.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuthenticatedAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated === null) {
      // isAuthenticated is still being initialized
      return;
    }
    if (!isAuthenticated) {
      dispatch(push(`/${HOME}`));
    }
  }, [dispatch, isAuthenticated]);

  const manageEmployees = useCallback(() => {
    dispatch(push(`/${MANAGE_EMPLOYEES}`));
  }, [dispatch]);

  const goDashBoard = useCallback(() => {
    dispatch(push(`/${ADMIN_DASHBOARD}`));
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Manage Reviews</h1>
        <div className={styles.AppLink} onClick={manageEmployees}>
          Manage Employees
        </div>
        <div className={styles.AppLink} onClick={goDashBoard}>
          Admin Dashboard
        </div>
      </header>
    </div>
  );
};

export default memo(Home);
