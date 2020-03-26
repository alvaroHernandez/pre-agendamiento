import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Centers from '../Centers/Centers';
import SamplePage from "../../example/SamplePage/SamplePage";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/centros" component={Centers} />
            <Route path="/medias" component={SamplePage} />
        </Switch>
    );
}
