import React from 'react';
import Home from '../Home/Home';
import { Switch, Route, Router } from 'react-router-dom';
import history from '../../services/history';

const AuthenticatedApp = () => (
  <Router history={history}>
    <Switch>
      <Route path='/' exact component={Home} />
    </Switch>
  </Router>
);

export default AuthenticatedApp;
