import React, { memo, useCallback, useEffect } from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin, checkAuthenticatedAdmin } from '../../redux/actions';
import { HOME } from '../../util/constants';
import styles from './footer.module.scss';

const Footer = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.admin.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuthenticatedAdmin());
  }, [dispatch]);

  const goHome = useCallback(() => {
    dispatch(push(HOME));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutAdmin());
  }, [dispatch]);

  return (
    <>
      <div className={styles.HomeLink} onClick={goHome}>
        Home
      </div>
      {isAuthenticated && (
        <div className={styles.LogoutLink} onClick={logout}>
          Logout
        </div>
      )}
    </>
  );
};

export default memo(Footer);
