import React, { PureComponent } from 'react';
import { compose } from 'redux';

import ShopView from './ShopView';
import withView from '../../hocs/withView';
import { getItems, buyItem } from '../../api/requestItem';
import withUser from '../../hocs/withUser';
import { ITEM_TYPE } from '../../constants/codes';
import MessageModal from '../../components/MessageMoal/index';

class ShopContainer extends PureComponent {
  _handleOnBuyItem = itemId => {
    const { viewActions, user, history } = this.props;
    buyItem(itemId).then(res => {
      const { itemTypeCd, value, insert, update } = res.data;
      if (itemTypeCd === ITEM_TYPE.CREDIT) {
        const type = value === 'pickCredit' ? '채집' : '시합';
        MessageModal({
          type: 'success',
          title: '크레딧 충전 완료',
          content: `${type}크레딧이 충전되었습니다.`
        });
      } else if (itemTypeCd === ITEM_TYPE.PICK) {
        viewActions.receiveView('pickedMons', { insert, update });
        viewActions.receiveView('prevUserCollections', user.collections);
        history.push('/pick');
      }
    });
  };

  render() {
    return <ShopView {...this.props} onBuyItem={this._handleOnBuyItem} />;
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
