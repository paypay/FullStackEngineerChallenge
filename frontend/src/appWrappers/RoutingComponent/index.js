import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ADMIN_DASHBOARD, ADMIN_LOGIN, MANAGE_EMPLOYEES, MANAGE_REVIEWS } from '../../util/constants';

import Home from '../../screens/Home';
import AdminLogin from '../../screens/AdminLogin';
import AdminDashboard from '../../screens/AdminDashboard';
import AdminEmployees from '../../screens/AdminEmployees';
import AdminReviews from '../../screens/AdminReviews';
import NotFound from '../../screens/NotFound';
import Footer from '../../components/Footer';
import FullScreenLoading from '../../components/FullScreenLoading';

const RoutingComponent = () => {
  const isLoading = useSelector(state => state.common.isLoading);

  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={`/${ADMIN_LOGIN}`} exact component={AdminLogin} />
        <Route path={`/${ADMIN_DASHBOARD}`} exact component={AdminDashboard} />
        <Route path={`/${MANAGE_EMPLOYEES}`} exact component={AdminEmployees} />
        <Route path={`/${MANAGE_REVIEWS}`} exact component={AdminReviews} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      {isLoading && <FullScreenLoading />}
    </>
  );
};

export default memo(RoutingComponent);
