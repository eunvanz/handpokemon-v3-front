import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';

import { CreateMon, CreateMonImage } from './routes';

const SecretGardenView = ({ match, history }) => {
  return (
    <Switch>
      <AdminLayout history={history}>
        <Route path={`${match.url}/create-mon/:id`} component={CreateMon} />
        <Route
          path={`${match.url}/create-mon-image/:id`}
          component={CreateMonImage}
        />
      </AdminLayout>
    </Switch>
  );
};

export default memo(SecretGardenView);
