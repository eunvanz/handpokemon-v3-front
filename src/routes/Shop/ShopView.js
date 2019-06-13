import React, { memo, useState, useCallback } from 'react';
import ContentContainer from '../../components/ContentContainer';
import { Row, Col, Modal, Button } from 'antd';
import ItemCard from '../../components/ItemCard';
import SliderInput from '../../components/SliderInput';
import MessageModal from '../../components/MessageMoal/index';

const ShopView = ({ items, onBuyItem, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [itemToBuy, setItemToBuy] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleOnClickItemCard = useCallback(
    item => {
      const { pokemoney } = user || { pokemoney: 0 };
      const { price } = item;
      if (price <= pokemoney) {
        setQuantity(1);
        setMaxQuantity(Math.floor(pokemoney / price));
      } else {
        setQuantity(0);
        setMaxQuantity(0);
      }
      setItemToBuy(item);
      setShowModal(true);
    },
    [user]
  );
  const handleOnClickCancel = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      setQuantity(0);
      setMaxQuantity(0);
      setItemToBuy(null);
    }, 100);
  }, []);
  const handleOnBuy = useCallback(() => {
    setLoading(true);
    onBuyItem({ itemId: itemToBuy.id, quantity }).then(() => {
      setLoading(false);
      handleOnClickCancel();
      MessageModal({
        type: 'success',
        title: '구매완료',
        content: '아이템이 선물함으로 발송되었습니다.'
      });
    });
  }, [onBuyItem, handleOnClickCancel, itemToBuy, quantity]);
  return (
    <ContentContainer>
      <Row gutter={6}>
        {items.map(item => (
          <Col xs={12} sm={6} xl={4} key={item.id}>
            <ItemCard {...item} onClick={() => handleOnClickItemCard(item)} />
          </Col>
        ))}
      </Row>
      <Modal
        visible={showModal}
        title='아이템구매'
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
            onClick={itemToBuy ? handleOnBuy : null}
            disabled={quantity === 0}
            loading={loading}
          >
            구매하기
          </Button>
        ]}
      >
        {itemToBuy && (
          <>
            <h3 style={{ marginBottom: 24 }}>{itemToBuy.description}</h3>
            <SliderInput
              onChange={setQuantity}
              value={quantity}
              max={maxQuantity}
              formatter={value => `${Number(value).toLocaleString()}개`}
            />
            <Row>
              <Col span={24} style={{ marginTop: 24 }}>
                <h3 style={{ marginBottom: 0 }}>
                  비용:{' '}
                  <span className='c-primary'>
                    {Number(quantity * itemToBuy.price).toLocaleString()}P
                  </span>
                </h3>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </ContentContainer>
  );
};

export default memo(ShopView);
