import React, { PureComponent } from 'react';
import { compose } from 'redux';

import WorkshopView from './WorkshopView';
import withList from '../../hocs/withList';
import { getAllWorkshops } from '../../api/requestWorkshop';

class WorkshopContainer extends PureComponent {
  render() {
    return <WorkshopView {...this.props} />;
  }
}

const wrappedWorkshopView = compose(
  withList([
    {
      key: 'workshopList',
      request: () => getAllWorkshops({ curPage: 1, perPage: 24 })
    }
  ])
)(WorkshopContainer);

export default wrappedWorkshopView;
