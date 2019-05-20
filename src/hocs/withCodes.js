import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCodes, receiveCodes } from '../store/codes';
import SpinContainer from '../components/SpinContainer/SpinContainer';

export default ComposedComponent => {
  class withCodes extends React.Component {
    componentDidMount() {
      const { codes, codesActions } = this.props;
      if (!codes) {
        codesActions.fetchCodes();
      }
    }

    render() {
      if (!this.props.codes) return <SpinContainer />;
      return <ComposedComponent {...this.props} />;
    }
  }

  withCodes.propTypes = {
    codes: PropTypes.array,
    codesActions: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    codes: state.codes
  });

  const mapDispatchToProps = dispatch => ({
    codesActions: {
      receiveCodes: isTransparent => dispatch(receiveCodes(isTransparent)),
      fetchCodes: () => dispatch(fetchCodes())
    }
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withCodes);
};
