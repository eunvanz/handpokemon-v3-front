import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import SignUpView from './SignUpView';
import withUser from '../../hocs/withUser';
import withForm from '../../hocs/withForm';

class SignUpContainer extends PureComponent {
  _handleOnClickSignUp = () => {};

  render() {
    return (
      <SignUpView {...this.props} onClickSignUp={this._handleOnClickSignUp} />
    );
  }
}

const wrappedSignUpView = compose(
  withUser({ isNoUserRequired: true }),
  withRouter,
  withForm
)(SignUpContainer);

export default wrappedSignUpView;
