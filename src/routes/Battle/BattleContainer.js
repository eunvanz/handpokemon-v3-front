import React, { PureComponent } from 'react';
import { compose } from 'redux';

import BattleView from './BattleView';
import withView from '../../hocs/withView';

class BattleContainer extends PureComponent {
  render() {
    return <BattleView {...this.props} />;
  }
}

const wrappedBattleView = compose(withView())(BattleContainer);

export default wrappedBattleView;
