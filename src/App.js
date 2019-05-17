import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.less';
import BaseLayout from './layouts/BaseLayout';
import { SignUp } from './routes';

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Switch>
            <Route path='/sign-up' component={SignUp} />
          </Switch>
        </BaseLayout>
      </Router>
    </Provider>
  );
};

export default App;
