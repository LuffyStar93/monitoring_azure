import React from 'react';
import  About  from './views/about/about';
import App from './App'
import Nav from './nav';

import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Nav/>
      <Switch>
        <Route exact path="/Home" component={App} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/About" component={About} />
      </Switch>
    </div>
  );
};