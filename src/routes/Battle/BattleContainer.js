import React, { PureComponent } from 'react';
import { compose } from 'redux';

import BattleView from './BattleView';

class BattleContainer extends PureComponent {
  render() {
    return <BattleView {...this.props} />;
  }
}

const wrappedBattleView = compose()(BattleContainer);

export default wrappedBattleView;
