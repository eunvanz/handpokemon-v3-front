import React, { PureComponent } from 'react';
import { compose } from 'redux';

import GiftboxView from './GiftboxView';
import withUser from '../../hocs/withUser';
import { useItems } from '../../api/requestUserItem';
import MessageModal from '../../components/MessageMoal/index';
import { ITEM_TYPE } from '../../constants/codes';
import SpinContainer from '../../components/SpinContainer';
import withView from '../../hocs/withView';

class GiftboxContainer extends PureComponent {
  _handleOnUseItem = ({ itemId, quantity }) => {
    const { viewActions, history, user } = this.props;
    return useItems({ itemId, quantity }).then(res => {
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
      return Promise.resolve();
    });
  };

  render() {
    const { user } = this.props;
    if (!user.items) return <SpinContainer />;
    return <GiftboxView {...this.props} onUseItem={this._handleOnUseItem} />;
  }
}

const wrappedGiftboxView = compose(
  withUser({ required: true }),
  withView()
)(GiftboxContainer);

export default wrappedGiftboxView;
