import React, { PureComponent } from 'react';
import { compose } from 'redux';

import SidebarView from './SidebarView';
import withUser from '../../../hocs/withUser';

class SidebarContainer extends PureComponent {
  render() {
    return <SidebarView {...this.props} />;
  }
}

const wrappedSidebarView = compose(withUser())(SidebarContainer);

export default wrappedSidebarView;
