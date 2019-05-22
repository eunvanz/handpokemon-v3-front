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
      centered
    >
      <Row gutter={24}>
        <Col sm={8} span={24} className='text-center'>
          <img
            src={getMonImageUrl(mon)}
            alt='손켓몬 이미지'
            style={{ width: '100%', maxWidth: 200 }}
          />
        </Col>
        <Col sm={16} span={24}>
          {!isFlipped && <MonInfo mon={mon} codes={codes} />}
          {isFlipped && <MonStat mon={mon} />}
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(MonModal);
