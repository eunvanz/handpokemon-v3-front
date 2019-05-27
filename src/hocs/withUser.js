import React, { PureComponent } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  clearUser,
  receiveUser,
  signInUser,
  signInUserWithToken,
  fetchUserCollectionsWithToken
} from '../store/user';
import SpinContainer from '../components/SpinContainer/SpinContainer';
import { isEmpty } from '../libs/commonUtils';
import { isAdminUser } from '../libs/hpUtils';

export default ({
  required,
  adminRequired,
  noUserRequired
} = {}) => ComposedComponent => {
  class withUser extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isUserLoaded: !isEmpty(props.user)
      };
    }

    componentDidMount() {
      const { userActions } = this.props;
      if (!this.state.isUserLoaded) {
        const authToken = localStorage.getItem('auth');
        if (authToken) {
          // 로그인 시도
          userActions
            .signInUserWithToken()
            .then(() => {
              this.setState({ isUserLoaded: true });
            })
            .catch(() => {
              localStorage.removeItem('auth');
              this.setState({ isUserLoaded: true });
            })
            .then(() => {
              userActions.fetchUserCollectionsWithToken();
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
      else if ((required || adminRequired) && !user) {
        return <Redirect to='/sign-in' />;
      } else if ((adminRequired || required) && user) {
        if (adminRequired && !isAdminUser(user)) {
          return <Redirect to='/' />;
        } else {
          return <ComposedComponent {...this.props} />;
        }
      } else if (noUserRequired && user) {
        return <Redirect to='/' />;
      }
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user: state.user
  });

  const mapDispatchToProps = dispatch => ({
    userActions: {
      receiveUser: user => dispatch(receiveUser(user)),
      clearUser: () => dispatch(clearUser()),
      signInUserWithToken: () => dispatch(signInUserWithToken()),
      signInUser: data => dispatch(signInUser(data)),
      fetchUserCollectionsWithToken: () =>
        dispatch(fetchUserCollectionsWithToken())
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
