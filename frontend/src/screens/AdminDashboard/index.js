import React, { memo, useEffect, useCallback } from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthenticatedAdmin } from '../../redux/actions';
import { MANAGE_EMPLOYEES, MANAGE_REVIEWS, ADMIN_LOGIN } from '../../util/constants';
import styles from './adminDashboard.module.scss';

const AdminDashboard = () => {
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
      dispatch(push(`/${ADMIN_LOGIN}`));
    }
  }, [dispatch, isAuthenticated]);

  const manageEmployees = useCallback(() => {
    dispatch(push(`/${MANAGE_EMPLOYEES}`));
  }, [dispatch]);

  const manageReviews = useCallback(() => {
    dispatch(push(`/${MANAGE_REVIEWS}`));
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Admin Dashboard</h1>
        <div className={styles.AppLink} onClick={manageEmployees}>
          Manage Employees
        </div>
        <div className={styles.AppLink} onClick={manageReviews}>
          Manage Reviews
        </div>
      </header>
    </div>
  );
};

export default memo(AdminDashboard);
