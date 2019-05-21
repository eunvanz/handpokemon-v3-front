import React, { memo, useState } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { getMonImageUrl } from '../../libs/hpUtils';
import MonInfo from '../MonInfo/index';
import MonStat from '../MonStat/index';

const MonModal = ({ visible, onCancel, mon, codes }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Modal
      visible={visible}
      title='손켓몬 정보'
      footer={[
        <Button size='large' type='link' key='close' onClick={onCancel}>
          닫기
        </Button>,
        <Button
          size='large'
          key='flip'
          type='primary'
          onClick={() => setIsFlipped(!isFlipped)}
          icon='sync'
        >
          뒤집기
        </Button>
      ]}
      onCancel={onCancel}
    >
      <Row gutter={12}>
        <Col span={8} sm={24}>
          <img src={getMonImageUrl(mon)} alt='손켓몬 이미지' width='100%' />
        </Col>
        <Col span={16} sm={24}>
          {!isFlipped && <MonInfo mon={mon} codes={codes} />}
          {isFlipped && <MonStat mon={mon} />}
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(MonModal);
