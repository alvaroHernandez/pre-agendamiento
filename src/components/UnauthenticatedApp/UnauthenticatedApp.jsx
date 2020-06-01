import React from 'react';
import Login from '../Login/Login';
import { Switch, Route, Router } from 'react-router-dom';
import history from '../../services/history';
import WeekScheduler from '../WeekScheduler/WeekScheduler';

const UnauthenticatedApp = () => (
  <Router history={history}>
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/weekScheduler' exact component={WeekScheduler} />
    </Switch>
  </Router>
);

export default UnauthenticatedApp;
