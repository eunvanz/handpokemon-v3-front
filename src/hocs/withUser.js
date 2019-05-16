import React, { PureComponent } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  clearUser,
  receiveUser,
  signInUser,
  signInUserWithToken
} from '../store/user';
import SpinContainer from '../components/SpinContainer/SpinContainer';
import { isEmpty } from '../libs/commonUtils';
import { isAdminUser } from '../libs/hpUtils';

export default ({
  isUserRequired,
  isAdminRequired,
  isNoUserRequired
} = {}) => ComposedComponent => {
  class withUser extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isUserLoaded: !isEmpty(props.user)
      };
    }

    componentDidMount() {
      const { userAction } = this.props;
      if (!this.state.isUserLoaded) {
        const authToken = localStorage.getItem('auth');
        if (authToken) {
          // 로그인 시도
          userAction
            .signInUserWithToken()
            .then(() => {
              this.setState({ isUserLoaded: true });
            })
            .catch(() => {
              localStorage.removeItem('auth');
              this.setState({ isUserLoaded: true });
            });
        } else {
          this.setState({ isUserLoaded: true });
        }
      }
    }

    render() {
      const { user } = this.props;
      const { isUserLoaded } = this.state;
      if (!isUserLoaded) return <SpinContainer />;
      else if (isUserRequired && !user) {
        return <Redirect to='/sign-in' />;
      } else if (isUserRequired && user) {
        if (isAdminRequired && !isAdminUser(user)) {
          return <Redirect to='/' />;
        } else {
          return <ComposedComponent {...this.props} />;
        }
      } else if (isNoUserRequired && user) {
        return <Redirect to='/' />;
      }
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user: state.user
  });

  const mapDispatchToProps = dispatch => ({
    userAction: {
      receiveUser: user => dispatch(receiveUser(user)),
      clearUser: () => dispatch(clearUser()),
      signInUserWithToken: token => dispatch(signInUserWithToken(token)),
      signInUser: data => dispatch(signInUser(data))
    }
  });

  return compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    withRouter
  )(withUser);
};
