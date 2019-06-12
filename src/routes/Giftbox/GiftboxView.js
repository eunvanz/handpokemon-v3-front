import React, { memo, useMemo, useCallback, useState } from 'react';
import countBy from 'lodash/countBy';

import ContentContainer from '../../components/ContentContainer/index';
import { Empty, Row, Col, Modal, Button } from 'antd';
import ItemCard from '../../components/ItemCard/index';
import SliderInput from '../../components/SliderInput';

const GiftboxView = ({ user, onUseItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [itemToUse, setItemToUse] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleOnClickCancel = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      setQuantity(0);
      setMaxQuantity(0);
      setItemToUse(null);
    }, 100);
  }, []);

  const handleOnUse = useCallback(() => {
    setLoading(true);
    onUseItem({ itemId: itemToUse.id, quantity }).then(() => {
      setLoading(false);
      handleOnClickCancel();
    });
  }, [onUseItem, handleOnClickCancel, itemToUse, quantity]);

  const countByItemId = useMemo(() => {
    return countBy(user.items, 'itemId');
  }, [user.items]);

  const userItems = useMemo(() => {
    const itemIds = Object.keys(countByItemId);
    const result = [];
    itemIds.forEach(itemId => {
      result.push(
        user.items.filter(item => String(item.itemId) === itemId)[0].item
      );
    });
    return result.map(item =>
      Object.assign(item, { quantity: countByItemId[item.id] })
    );
  }, [user.items, countByItemId]);

  const handleOnClickItemCard = useCallback(
    item => {
      setQuantity(1);
      setMaxQuantity(countByItemId[item.id]);
      setItemToUse(item);
      setShowModal(true);
    },
    [countByItemId]
  );

  return (
    <ContentContainer>
      {userItems.length > 0 && (
        <Row gutter={6}>
          {userItems.map(item => (
            <Col xs={12} sm={6} xl={4}>
              <ItemCard {...item} onClick={() => handleOnClickItemCard(item)} />
            </Col>
          ))}
        </Row>
      )}
      {userItems.length === 0 && (
        <div
          className='center-middle-aligner'
          style={{ height: 'calc(100vh - 164px)' }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='선물함이 비어있습니다.'
          />
        </div>
      )}
      <Modal
        visible={showModal}
        title='아이템사용'
        onCancel={handleOnClickCancel}
        width={360}
        footer={[
          <Button
            type='link'
            size='large'
            key='close'
            onClick={handleOnClickCancel}
          >
            닫기
          </Button>,
          <Button
            type='primary'
            size='large'
            key='buy'
            onClick={itemToUse ? handleOnUse : null}
            disabled={quantity === 0}
            loading={loading}
          >
            사용하기
          </Button>
        ]}
      >
        {itemToUse && (
          <>
            <h3 style={{ marginBottom: 24 }}>{itemToUse.description}</h3>
            <SliderInput
              onChange={setQuantity}
              value={quantity}
              max={maxQuantity}
              formatter={value => `${Number(value).toLocaleString()}개`}
            />
          </>
        )}
      </Modal>
    </ContentContainer>
  );
};

export default memo(GiftboxView);
