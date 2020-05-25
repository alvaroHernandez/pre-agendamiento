import React from 'react';
import Login from '../Login/Login';
import { Switch, Route, Router } from 'react-router-dom';
import history from '../../services/history';

const UnauthenticatedApp = () => (
  <Router history={history}>
    <Switch>
      <Route path='/' exact component={Login} />
    </Switch>
  </Router>
);

export default UnauthenticatedApp;
