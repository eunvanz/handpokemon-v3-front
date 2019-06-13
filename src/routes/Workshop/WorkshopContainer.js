import React, { PureComponent } from 'react';
import { compose } from 'redux';

import WorkshopView from './WorkshopView';
import withList from '../../hocs/withList';
import { getAllWorkshops } from '../../api/requestWorkshop';
import { postLike, deleteLikeById } from '../../api/requestLike';

class WorkshopContainer extends PureComponent {
  _handleOnClickLike = workshop => {
    const { user, history } = this.props;
    if (!user) return history.push('/sign-in');
    const userLike = workshop.likes.filter(like => like.userId === user.id)[0];
    if (!userLike) {
      const newLike = {
        userId: user.id,
        workshopId: workshop.id
      };
      return postLike(newLike);
    } else {
      return deleteLikeById(userLike.id);
    }
  };

  render() {
    return (
      <WorkshopView {...this.props} onClickLike={this._handleOnClickLike} />
    );
  }
}

const wrappedWorkshopView = compose(
  withList([
    {
      key: 'workshopList',
      request: () => getAllWorkshops({ curPage: 1, perPage: 24 }),
      required: true
    }
  ])
)(WorkshopContainer);

export default wrappedWorkshopView;
