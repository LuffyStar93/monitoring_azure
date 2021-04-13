import React from 'react';
import  About  from './views/about/about';
import promo_template from './components/promo/Promo_template'
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
        <Route exact path="/SimplonCloudAulnay" component={promo_template} />
        <Route exact path="/SimplonNantesIA1" component={promo_template} />
      </Switch>
    </div>
  );
};