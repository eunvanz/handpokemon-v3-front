import React, { PureComponent } from 'react';
import { compose } from 'redux';
import withView from './withView';
import { withRouter } from 'react-router-dom';
import { putCollection } from '../api/requestCollection';

export default ComposedComponent => {
  class withMonCardProps extends PureComponent {
    _handleOnToggleFavorite = col => {
      return putCollection(
        Object.assign({}, col, { favorite: col.favorite === 1 ? 0 : 1 })
      );
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          monCardProps={{
            toggleFavorite: this._handleOnToggleFavorite
          }}
        />
      );
    }
  }

  return compose(
    withView(),
    withRouter
  )(withMonCardProps);
};
