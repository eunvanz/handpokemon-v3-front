import { compose } from 'redux';

import CreateMonView from './CreateMonView';
import withUser from '../../../../hocs/withUser';
import withView from '../../../../hocs/withView';
import withForm from '../../../../hocs/withForm';
import withCodes from '../../../../hocs/withCodes';

const wrappedCreateMonView = compose(
  withUser({ isAdminRequired: true }),
  withView([
    {
      key: 'mon'
    }
  ]),
  withForm,
  withCodes
)(CreateMonView);

export default wrappedCreateMonView;
