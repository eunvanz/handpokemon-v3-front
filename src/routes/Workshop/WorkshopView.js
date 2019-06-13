import React, { memo, useCallback, useState } from 'react';
import ContentContainer from '../../components/ContentContainer';
import { Row, Col, Modal, Button } from 'antd';
import WorkshopCard from '../../components/WorkshopCard';

const WorkshopView = ({ workshops, onClickLike }) => {
  return (
    <ContentContainer>
      <Row gutter={6}>
        {workshops.map(item => (
          <Col xs={12} sm={6} xl={4} key={item.id}>
            <WorkshopCard workshop={item} onClickLike={onClickLike} />
          </Col>
        ))}
      </Row>
    </ContentContainer>
  );
};

export default memo(WorkshopView);
