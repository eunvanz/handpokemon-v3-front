import React from 'react';
import { connect } from 'react-redux';
import {
  fetchAndAppendList,
  clearList,
  removeItem,
  receiveList,
  replaceItem,
  appendList
} from '../store/list';
import SpinContainer from '../components/SpinContainer/SpinContainer';

// options { request, key, required, persistent, preventRefresh } 의 배열
export default (options = []) => ComposedComponent => {
  class withList extends React.PureComponent {
    componentDidMount() {
      options.forEach(item => {
        const { request, preventRefresh, key } = item;
        if (request)
          if (!preventRefresh || (!this.props.key && preventRefresh)) {
            this.props.listActions.fetchAndAppendList({
              request,
              key,
              reset: true
            });
          }
      });
    }

    componentWillUnmount() {
      options.forEach(item => {
        const { persistent, key } = item;
        if (!persistent) this.props.listActions.clearList(key);
      });
    }

    _isLoadingRequired = () => {
      let isLoading = false;
      options.forEach(item => {
        const { request, required, key } = item;
        if (request && !this.props[key] && required) isLoading = true;
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
      result[item.key] = state.list[item.key];
    });
    return result;
  };

  const mapDispatchToProps = dispatch => ({
    listActions: {
      fetchAndAppendList: ({ request, key, reset }) =>
        dispatch(fetchAndAppendList({ request, key, reset })),
      appendList: (key, data) => dispatch(appendList(key, data)),
      clearList: key => dispatch(clearList(key)),
      removeItem: ({ key, conditionKey, value }) =>
        dispatch(removeItem({ key, conditionKey, value })),
      receiveList: (key, data) => dispatch(receiveList(key, data)),
      replaceItem: ({ key, conditionKey, value, item }) =>
        dispatch(replaceItem({ key, conditionKey, value, item }))
    }
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withList);
};
