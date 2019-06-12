import React, { PureComponent } from 'react';
import { compose } from 'redux';

import ShopView from './ShopView';
import withView from '../../hocs/withView';
import { getItems, buyItem } from '../../api/requestItem';
import withUser from '../../hocs/withUser';
import SpinContainer from '../../components/SpinContainer';

class ShopContainer extends PureComponent {
  state = {
    loading: false
  };

  _handleOnBuyItem = ({ itemId, quantity }) => {
    const { userActions } = this.props;
    return buyItem({ itemId, quantity }).then(() =>
      Promise.all([
        userActions.signInUserWithToken(),
        userActions.fetchUserItemsWithToken()
      ])
    );
  };

  render() {
    const { items } = this.props;
    if (!items) return <SpinContainer />;
    return (
      <div>
        {this.state.loading && <SpinContainer />}
        <ShopView {...this.props} onBuyItem={this._handleOnBuyItem} />
      </div>
    );
  }
}

const wrappedShopView = compose(
  withView([
    {
      key: 'items',
      request: getItems,
      persistent: true
    }
  ]),
  withUser()
)(ShopContainer);

export default wrappedShopView;
