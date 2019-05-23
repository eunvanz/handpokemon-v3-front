import React, { PureComponent } from 'react';
import { compose } from 'redux';

import PickView from './PickView';
import withView from '../../hocs/withView';
import withCodes from '../../hocs/withCodes';
import { DUNGEON } from '../../constants/rules';
import { getPick } from '../../api/requestCollection';
import { GRADE } from '../../constants/codes';
import withUser from '../../hocs/withUser';

class PickContainer extends PureComponent {
  _handleOnSelectDungeon = ({ type, repeatCnt }) => {
    const { viewActions, userActions } = this.props;
    const dungeon = DUNGEON[type];
    const { attrCds } = dungeon;
    return getPick({
      gradeCds: [GRADE.BASIC],
      attrCds,
      repeatCnt
    }).then(res => {
      viewActions.receiveView('pickedMons', res.data);
      userActions.signInWithToken();
      return Promise.resolve();
    });
  };

  render() {
    return (
      <PickView onSelectDungeon={this._handleOnSelectDungeon} {...this.props} />
    );
  }
}

const wrappedPickView = compose(
  withView([
    {
      key: 'pickedMons'
    }
  ]),
  withCodes,
  withUser({ required: true })
)(PickContainer);

export default wrappedPickView;
