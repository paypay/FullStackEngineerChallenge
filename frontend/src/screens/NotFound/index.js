import React, { memo, useCallback, useEffect } from 'react';
import { push, replace } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { HOME } from '../../util/constants';
import logo from '../../assets/logo.svg';
import styles from './notFound.module.scss';

const NotFound = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(replace('/404'));
  }, [dispatch]);

  const goHome = useCallback(() => {
    dispatch(push(HOME));
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <p>NOT FOUND!</p>
        <div className={styles.AppLink} onClick={goHome}>
          Home
        </div>
      </header>
    </div>
  );
};

export default memo(NotFound);
