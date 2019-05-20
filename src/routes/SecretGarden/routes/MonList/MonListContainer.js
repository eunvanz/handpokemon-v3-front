import React, { PureComponent } from 'react';
import { compose } from 'redux';

import MonListView from './MonListView';
import withView from '../../../../hocs/withView';
import { getAllMons } from '../../../../api/requestMon';
import withUser from '../../../../hocs/withUser';
import withCodes from '../../../../hocs/withCodes';

class MonListContainer extends PureComponent {
  _handleOnClickItem = monId => {
    const { history } = this.props;
    history.push(`/secret-garden/create-mon/${monId}`);
  };

  render() {
    return (
      <MonListView onClickItem={this._handleOnClickItem} {...this.props} />
    );
  }
}

const wrappedMonListView = compose(
  withView([
    {
      key: 'monList',
      request: getAllMons,
      isRequired: true,
      isPersistent: true
    }
  ]),
  withUser({ isAdminRequired: true }),
  withCodes
)(MonListContainer);

export default wrappedMonListView;
