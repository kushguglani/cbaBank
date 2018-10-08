import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import DefaultMain from './main/defaultMain';
import LinkAccount from './main/linkAccount';
import PrivateRoute from '../helpers/privateRoute';
import TelcoDashboard from './main/telcoDashboard';

export default class Routing extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={DefaultMain} />
          <PrivateRoute  path="/dashboard/link" component={LinkAccount} />
          <PrivateRoute  path="/dashboard/link" component={LinkAccount} />
          <PrivateRoute  path="/dashboard/telco" component={TelcoDashboard} />
        </Switch>
      </Router>
    )
  }
}