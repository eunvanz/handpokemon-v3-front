import React, { PureComponent } from 'react';
import { compose } from 'redux';
import withView from '../../hocs/withView';

import AchievementView from './AchievementView';
import { getAllAchievements } from '../../api/requestAchievement';

class AchievementContainer extends PureComponent {
  render() {
    return <AchievementView {...this.props} />;
  }
}

const wrappedAchievementView = compose(
  withView({
    key: 'achievements',
    request: getAllAchievements,
    persistent: true,
    required: true
  })
)(AchievementContainer);

export default wrappedAchievementView;
