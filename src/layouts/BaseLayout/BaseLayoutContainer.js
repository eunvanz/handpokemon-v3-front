import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import BaseLayoutView from './BaseLayoutView';
import withUser from '../../hocs/withUser';
import withUi from '../../hocs/withUi';
import ConfirmModal from '../../components/ConfirmModal';
import { isScreenSize, SCREEN_SIZE } from '../../libs/screenSize';
import withCodes from '../../hocs/withCodes';

class BaseLayoutContainer extends PureComponent {
  _handleOnToggleDrawer = show => {
    const { uiActions } = this.props;
    uiActions.toggleDrawer(show);
  };

  _handleOnClickLogout = () => {
    const { history, userActions } = this.props;
    ConfirmModal({
      title: '로그아웃',
      content: '정말 로그아웃 하시겠습니까?',
      onOk: () => {
        localStorage.removeItem('auth');
        userActions.clearUser();
        history.push('/sign-in');
      }
    });
  };

  _handleOnChangeRoute = route => {
    const { uiActions, history } = this.props;
    if (isScreenSize.smallerThan(SCREEN_SIZE.SM)) uiActions.toggleDrawer(false);
    history.push(route);
  };

  _handleRefreshUser = () => {
    const { userActions } = this.props
    userActions.signInUserWithToken()
  }

  render() {
    return (
      <BaseLayoutView
        onToggleDrawer={this._handleOnToggleDrawer}
        onClickLogout={this._handleOnClickLogout}
        onChangeRoute={this._handleOnChangeRoute}
        refreshUser={this._handleRefreshUser}
        {...this.props}
      />
    );
  }
}

const wrappedBaseLayoutView = compose(
  withUser(),
  withUi(),
  withRouter,
  withCodes
)(BaseLayoutContainer);

export default wrappedBaseLayoutView;
