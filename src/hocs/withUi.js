import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { toggleDrawer, receiveUi } from '../store/ui';

export default ({ customStates } = {}) => ComposedComponent => {
  class withUi extends PureComponent {
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    const states = { isOpenDrawer: state.ui.isOpenDrawer };
    if (customStates) {
      customStates.forEach(key => {
        states[key] = state.ui[key];
      });
    }
    return states;
  };

  const mapDispatchToProps = dispatch => ({
    uiActions: {
      toggleDrawer: show => dispatch(toggleDrawer(show)),
      receiveUi: value => dispatch(receiveUi(value))
    }
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withUi);
};
