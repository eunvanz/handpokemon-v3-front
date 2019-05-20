import React from 'react';
import { connect } from 'react-redux';
import { fetchView, clearView, receiveView } from '../store/view';
import SpinContainer from '../components/SpinContainer/SpinContainer';
// {
//   request,
//   key,
//   isRequired,
//   isPersistent,
//   preventRefresh
// } 형태의 배열을 파라미터로 받음
export default (options = []) => ComposedComponent => {
  class withView extends React.PureComponent {
    componentDidMount() {
      options.forEach(item => {
        const { request, preventRefresh, key } = item;
        if (request) {
          if (!preventRefresh || (!this.props[key] && preventRefresh)) {
            this.props.viewActions.fetchView({ request, key });
          }
        }
      });
    }

    componentWillUnmount() {
      options.forEach(item => {
        const { isPersistent, key } = item;
        if (!isPersistent) this.props.viewActions.clearView(key);
      });
    }

    _isLoadingRequired = () => {
      let isLoading = false;
      options.forEach(item => {
        const { isRequired, key } = item;
        if (!this.props[key] && isRequired) isLoading = true;
      });
      return isLoading;
    };

    render() {
      if (this._isLoadingRequired()) return <SpinContainer />;
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    const result = {};
    options.forEach(item => {
      result[item.key] = state.view[item.key];
    });
    return result;
  };

  const mapDispatchToProps = dispatch => ({
    viewActions: {
      fetchView: ({ request, key }) => dispatch(fetchView({ request, key })),
      clearView: key => dispatch(clearView(key)),
      receiveView: (key, state) => dispatch(receiveView(key, state))
    }
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withView);
};
