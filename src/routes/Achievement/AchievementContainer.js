import React, { PureComponent } from 'react';
import { compose } from 'redux';
import withView from '../../hocs/withView';

import AchievementView from './AchievementView';
import { getAllAchievements } from '../../api/requestAchievement';
import withUser from '../../hocs/withUser';
import withCodes from '../../hocs/withCodes';
import { refreshUserAchievementsWithToken } from '../../api/requestUserAchievement';
import SpinContainer from '../../components/SpinContainer';
import MessageModal from '../../components/MessageMoal/index';

class AchievementContainer extends PureComponent {
  state = {
    loading: false
  };

  componentDidMount() {
    const { userActions } = this.props;
    userActions.fetchUserAchievementsWithToken();
    userActions.fetchUserCollectionsWithToken();
  }

  _handleOnClickActivate = attrCd => {
    const { userActions } = this.props;
    this.setState({ loading: true });
    refreshUserAchievementsWithToken(attrCd)
      .then(() => {
        return userActions.fetchUserAchievementsWithToken();
      })
      .then(() => {
        this.setState({ loading: false });
        MessageModal({
          type: 'success',
          title: '칭호 변경',
          content: '칭호가 변경되었습니다.'
        });
      });
  };

  render() {
    return (
      <div>
        {this.state.loading && <SpinContainer />}
        <AchievementView
          {...this.props}
          onClickActivate={this._handleOnClickActivate}
        />
      </div>
    );
  }
}

const wrappedAchievementView = compose(
  withUser({
    required: true
  }),
  withView([
    {
      key: 'achievements',
      request: getAllAchievements,
      persistent: true,
      required: true
    }
  ]),
  withCodes
)(AchievementContainer);

export default wrappedAchievementView;
