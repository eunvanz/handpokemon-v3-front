import React, { PureComponent } from 'react';
import { compose } from 'redux';

import HeaderView from './HeaderView';
import withUser from '../../../hocs/withUser';

class HeaderContainer extends PureComponent {
  render() {
    return <HeaderView {...this.props} />;
  }
}

const wrappedHeaderView = compose(withUser())(HeaderContainer);

export default wrappedHeaderView;
