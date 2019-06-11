import React, { memo } from 'react';
import ContentContainer from '../../components/ContentContainer';
import { Card, Row } from 'antd';

const ShopView = ({ items, onBuyItem }) => {
  return (
    <ContentContainer>
      <Row gutter={6}>{}</Row>
    </ContentContainer>
  );
};

export default memo(ShopView);
