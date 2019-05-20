import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import SignUpView from './SignUpView';
import withUser from '../../hocs/withUser';
import withForm from '../../hocs/withForm';
import { isDupEmail, isDupNickname } from '../../api/requestUser';

class SignUpContainer extends PureComponent {
  _handleOnClickSignUp = () => {};

  _checkDupEmail = email => {
    return isDupEmail(email);
  };

  _checkDupNickname = nickname => {
    return isDupNickname(nickname);
  };

  render() {
    return (
      <SignUpView
        {...this.props}
        onClickSignUp={this._handleOnClickSignUp}
        checkDupEmail={this._checkDupEmail}
        checkDupNickname={this._checkDupNickname}
      />
    );
  }
}

const wrappedSignUpView = compose(
  withUser({ isNoUserRequired: true }),
  withRouter,
  withForm
)(SignUpContainer);

export default wrappedSignUpView;
