import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import './App.less';
import BaseLayout from './layouts/BaseLayout';
import { SignUp, SignIn, SecretGarden, Pick, Collection } from './routes';

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <LastLocationProvider>
          <BaseLayout>
            <Switch>
              <Route path='/sign-up' component={SignUp} />
              <Route path='/sign-in' component={SignIn} />
              <Route path='/secret-garden' component={SecretGarden} />
              <Route path='/pick' component={Pick} />
              <Route path='/collection/:id' component={Collection} />
            </Switch>
          </BaseLayout>
        </LastLocationProvider>
      </Router>
    </Provider>
  );
};

export default App;
