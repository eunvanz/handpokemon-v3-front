import React, { PureComponent } from 'react';
import { compose } from 'redux';

import PickView from './PickView';
import withView from '../../hocs/withView';
import withCodes from '../../hocs/withCodes';
import { getPick } from '../../api/requestCollection';
import withUser from '../../hocs/withUser';

class PickContainer extends PureComponent {
  _handleOnPick = ({ gradeCds, attrCds, repeatCnt }) => {
    const { viewActions, userActions, prevPickOptions } = this.props;
    const pickOptions = Object.assign({}, prevPickOptions);
    if (gradeCds) pickOptions.gradeCds = gradeCds;
    if (attrCds) pickOptions.attrCds = attrCds;
    if (repeatCnt) pickOptions.repeatCnt = repeatCnt;
    viewActions.receiveView('prevPickOptions', pickOptions);
    return getPick(pickOptions).then(res => {
      viewActions.receiveView('pickedMons', res.data);
      userActions.signInUserWithToken();
      return Promise.resolve();
    });
  };

  render() {
    return <PickView onPick={this._handleOnPick} {...this.props} />;
  }
}

const wrappedPickView = compose(
  withView([
    {
      key: 'pickedMons'
    },
    {
      key: 'prevPickOptions'
    }
  ]),
  withCodes,
  withUser({ required: true })
)(PickContainer);

export default wrappedPickView;
