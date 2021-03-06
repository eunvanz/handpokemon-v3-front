import { compose } from 'redux';

import SecretGardenView from './SecretGardenView';
import withUser from '../../hocs/withUser';
import { withRouter } from 'react-router-dom';

const wrappedSecretGardenView = compose(
  withUser({ adminRequired: true }),
  withRouter
)(SecretGardenView);

export default wrappedSecretGardenView;
