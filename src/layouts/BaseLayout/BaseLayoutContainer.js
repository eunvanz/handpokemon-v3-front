import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import BaseLayoutView from './BaseLayoutView';
import withUser from '../../hocs/withUser';
import withUi from '../../hocs/withUi';
import ConfirmModal from '../../components/ConfirmModal';

class BaseLayoutContainer extends PureComponent {
  _handleOnToggleDrawer = show => {
    const { uiActions } = this.props;
    uiActions.toggleDrawer(show);
  };

  _handleOnClickLogout = () => {
    const { history } = this.props;
    ConfirmModal({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      onOk: () => {
        localStorage.removeItem('auth');
        history.push('/');
      }
    });
  };

  render() {
    return (
      <BaseLayoutView
        onToggleDrawer={this._handleOnToggleDrawer}
        {...this.props}
      />
    );
  }
}

const wrappedBaseLayoutView = compose(
  withUser(),
  withUi(),
  withRouter
)(BaseLayoutContainer);

export default wrappedBaseLayoutView;
