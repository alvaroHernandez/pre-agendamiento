import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Centers from '../Centers/Centers';
import Login from '../Login/Login';
import SamplePage from '../../example/SamplePage/SamplePage';
import Availability from '../Availability/Availability';
import TableAvailability from '../TableAvailability/TableAvailability';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/centros" component={Centers} />
      <Route path="/login" component={Login} />
      <Route path="/medias" component={SamplePage} />
      <Route path="/disponibilidad" component={Availability} />
      <Route path="/tabladisponibilidad" component={TableAvailability} />
    </Switch>
  );
}
