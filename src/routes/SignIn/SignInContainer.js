import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';

import SignInView from './SignInView';
import withUser from '../../hocs/withUser';
import withForm from '../../hocs/withForm';
import MessageModal from '../../components/MessageMoal';

class SignInContainer extends PureComponent {
  state = {
    isLoading: false
  };

  _handleOnClickLogin = () => {
    const { form, userActions, history, lastLocation } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ isLoading: true });
        userActions
          .signInUser(values)
          .then(() => {
            if (history.length >= 2 && lastLocation) history.go(-1);
            else history.push('/');
          })
          .catch(err => {
            this.setState({ isLoading: false });
            MessageModal({
              type: 'error',
              content: err
            });
          });
      }
    });
  };

  render() {
    return (
      <SignInView
        {...this.props}
        onClickLogin={this._handleOnClickLogin}
        isLoading={this.state.isLoading}
      />
    );
  }
}

const wrappedSignInView = compose(
  withUser({ noUserRequired: true }),
  withRouter,
  withForm,
  withLastLocation
)(SignInContainer);

export default wrappedSignInView;
