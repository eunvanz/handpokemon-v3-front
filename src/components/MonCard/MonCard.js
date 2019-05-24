import React, { memo, useCallback, useMemo, useState } from 'react';
import { Card, Col } from 'antd';
import { getMonImageUrl } from '../../libs/hpUtils';
import './MonCard.less';
import GradeTag from '../GradeTag';
import AttrTag from '../AttrTag';
import Cost from '../Cost/index';
import imgEmpty from '../../imgs/empty-mon.png';
import MonModal from '../MonModal';
import RankTag from '../RankTag';
import LevelTag from '../LevelTag';

const MonCard = ({ mon, hideInfo, codes, onClick, withWrapper }) => {
  const [showMonModal, setShowMonModal] = useState(false);

  const renderCover = useCallback(() => {
    if (!hideInfo) {
      return (
        <div style={{ position: 'relative' }}>
          <img
            src={getMonImageUrl(mon) || imgEmpty}
            alt='손켓몬 이미지'
            style={{ width: '100%' }}
          />
        </div>
      );
    } else {
      return (
        <div style={{ position: 'relative' }}>
          <img src={imgEmpty} alt='손켓몬 이미지' style={{ width: '100%' }} />
        </div>
      );
    }
  }, [mon, hideInfo]);

  const renderAttr = useCallback(() => {
    const thisMon = mon.mon || mon;
    const { gradeCd } = thisMon;
    return (
      <>
        <GradeTag gradeCd={gradeCd} />
        <AttrTag attrCd={mon.mainAttrCd} codes={codes} />
        {mon.subAttrCd && <AttrTag attrCd={mon.subAttrCd} codes={codes} />}
      </>
    );
  }, [mon, hideInfo]);

  const Wrapper = useMemo(() => {
    if (withWrapper) {
      return ({ children, ...props }) => (
        <Col
          xs={8}
          sm={6}
          xl={4}
          key={mon.id}
          style={{ marginBottom: 6 }}
          {...props}
        >
          {children}
        </Col>
      );
    } else {
      return ({ children, ...props }) => <div {...props}>{children}</div>;
    }
  }, [withWrapper]);

  const checkIsEvolutable = useCallback(() => {
    if (!mon.nextMons || mon.nextMons.length === 0) return false;
    const requiredLv = mon.nextMons[0].requiredLv;
    return mon.level >= requiredLv;
  }, [mon]);

  return (
    <Wrapper className='mon-card-wrapper'>
      {mon.mon && <RankTag rankCd={mon.rankCd} codes={codes} />}
      {mon.mon && (
        <LevelTag level={mon.level} isEvolutable={checkIsEvolutable()} />
      )}
      <Card
        hoverable
        cover={renderCover()}
        onClick={onClick ? onClick : () => setShowMonModal(true)}
        className='mon-card'
      >
        <div className='cost-section'>
          <Cost cost={(mon.mon || mon)['cost']} />
        </div>
        <div className='attr-section'>{renderAttr()}</div>
      </Card>
      <MonModal
        mon={mon}
        visible={showMonModal}
        onCancel={() => setShowMonModal(false)}
        codes={codes}
      />
    </Wrapper>
  );
};

export default memo(MonCard);
