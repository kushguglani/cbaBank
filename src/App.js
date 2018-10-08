import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import {Route} from 'react-router-dom';

import './App.css';
import LandingPage from './Component/landing/landing';
import Dashboard from './Containers/dashboard';
import Energy from './Containers/energy';
import Banking from './Containers/banking';
import PrivateRoute from './helpers/privateRoute'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute path="/dashboard" component={Dashboard} /> 
          <PrivateRoute path="/energy" component={Energy} />
          <PrivateRoute path="/banking" component={Banking} />
        </Switch>
      </Router>
    );
  }
}

export default App;
