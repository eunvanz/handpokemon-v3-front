import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.less';
import BaseLayout from './layouts/BaseLayout';

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <BaseLayout />
      </Router>
    </Provider>
  );
};

export default App;
