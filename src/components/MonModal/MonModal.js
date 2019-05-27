import React, { memo, useState, useMemo } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { getMonImageUrl } from '../../libs/hpUtils';
import MonInfo from '../MonInfo/index';
import MonStat from '../MonStat/index';
import LevelTag from '../LevelTag/index';
import LevelUpTag from '../LevelUpTag';

const MonModal = ({
  visible,
  onCancel,
  mon,
  codes,
  prevMon,
  onClickMix,
  onClickEvolute,
  mixable,
  evolutable
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isEvolutableLevel = useMemo(() => {
    if (!mon.nextMons || mon.nextMons.length === 0 || !mon.mon) return false;
    else return mon.nextMons[0].requiredLv <= mon.level;
  }, [mon]);

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
        <Col
          sm={8}
          span={24}
          className='text-center'
          style={{ marginBottom: 24 }}
        >
          <img
            src={getMonImageUrl(mon)}
            alt='손켓몬 이미지'
            style={{ width: '100%', maxWidth: 200 }}
          />
          <div style={{ marginTop: 12 }}>
            {prevMon && (
              <LevelUpTag level={mon.level} prevLevel={prevMon.level} />
            )}
            {!prevMon && <LevelTag level={mon.level} evolutable={evolutable} />}
          </div>
          <div style={{ marginTop: 12 }}>
            {mixable && (
              <Button
                size='small'
                onClick={() => onClickMix(mon)}
                style={{ margin: 2 }}
              >
                교배하기
              </Button>
            )}
            {evolutable && isEvolutableLevel && (
              <Button
                size='small'
                onClick={() => onClickEvolute(mon)}
                style={{ margin: 2 }}
              >
                진화하기
              </Button>
            )}
          </div>
        </Col>
        <Col sm={16} span={24}>
          {!isFlipped && (
            <MonInfo
              mon={prevMon || mon}
              codes={codes}
              nextMon={prevMon ? mon : null}
            />
          )}
          {isFlipped && (
            <MonStat mon={prevMon || mon} nextMon={prevMon ? mon : null} />
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default memo(MonModal);
