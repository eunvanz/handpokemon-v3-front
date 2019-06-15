import React, { PureComponent } from 'react';
import { compose } from 'redux';

import CommunityView from './CommunityView';
import withUser from '../../hocs/withUser';
import withForm from '../../hocs/withForm';

class CommunityContainer extends PureComponent {
  render() {
    return <CommunityView {...this.props} />;
  }
}

const wrappedCommunityView = compose(
  withUser(),
  withForm
)(CommunityContainer);

export default wrappedCommunityView;
