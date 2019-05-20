import React, { PureComponent } from 'react';
import { compose } from 'redux';

import MonListView from './MonListView';
import withView from '../../../../hocs/withView';
import { getAllMons } from '../../../../api/requestMon';

class MonListContainer extends PureComponent {
  render() {
    return <MonListView {...this.props} />;
  }
}

const wrappedMonListView = compose(
  withView([
    {
      key: 'monList',
      service: getAllMons
    }
  ])
)(MonListView);

export default wrappedMonListView;
