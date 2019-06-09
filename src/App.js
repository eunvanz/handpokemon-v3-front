import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import './App.less';
import BaseLayout from './layouts/BaseLayout';
import {
  SignUp,
  SignIn,
  SecretGarden,
  Pick,
  Collection,
  Book,
  Achievement,
  Ranking
} from './routes';
import ErrorBoundary from './components/ErrorBoundary';

const ScrollToTop = withRouter(({ location, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return children;
});

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <LastLocationProvider>
          <BaseLayout>
            <Switch>
              <ScrollToTop>
                <ErrorBoundary>
                  <Route path='/sign-up' component={SignUp} />
                  <Route path='/sign-in' component={SignIn} />
                  <Route path='/secret-garden' component={SecretGarden} />
                  <Route path='/pick' component={Pick} />
                  <Route path='/collection/:id' component={Collection} />
                  <Route path='/book' component={Book} />
                  <Route path='/achievement' component={Achievement} />
                  <Route path='/ranking/:type' component={Ranking} />
                </ErrorBoundary>
              </ScrollToTop>
            </Switch>
          </BaseLayout>
        </LastLocationProvider>
      </Router>
    </Provider>
  );
};

export default App;
