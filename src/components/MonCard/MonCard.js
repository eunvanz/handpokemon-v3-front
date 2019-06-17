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

const MonCard = ({
  mon,
  hideInfo,
  codes,
  onClick,
  withWrapper,
  prevMon,
  mixable,
  onClickMix,
  evolutable,
  onClickEvolute,
  isMock,
  overlay,
  bottomComponent,
  user,
  ...restProps
}) => {
  const [showMonModal, setShowMonModal] = useState(false);

  const renderCover = useCallback(() => {
    if (!hideInfo && !isMock) {
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
  }, [mon, hideInfo, isMock]);

  const renderAttr = useCallback(() => {
    if (!isMock) {
      const thisMon = mon.mon || mon;
      const { gradeCd } = thisMon;
      return (
        <>
          <GradeTag gradeCd={gradeCd} isMock={isMock} />
          <AttrTag attrCd={mon.mainAttrCd} codes={codes} isMock={isMock} />
          {mon.subAttrCd && (
            <AttrTag attrCd={mon.subAttrCd} codes={codes} isMock={isMock} />
          )}
        </>
      );
    } else {
      return (
        <>
          <GradeTag isMock={isMock} />
          <AttrTag isMock={isMock} />
          <AttrTag isMock={isMock} />
        </>
      );
    }
  }, [mon, isMock, codes]);

  const Wrapper = useMemo(() => {
    if (withWrapper) {
      return ({ children, ...props }) => (
        <Col
          xs={8}
          sm={6}
          xl={4}
          key={mon ? mon.id : props.key}
          style={{ marginBottom: 6 }}
          {...props}
        >
          {children}
        </Col>
      );
    } else {
      return ({ children, ...props }) => <div {...props}>{children}</div>;
    }
  }, [withWrapper, mon]);

  const checkIsEvolutable = useCallback(() => {
    if (!mon.nextMons || mon.nextMons.length === 0) return false;
    const requiredLv = mon.nextMons[0].requiredLv;
    return mon.level >= requiredLv;
  }, [mon]);

  const handleOnClickMix = useCallback(
    mon => {
      setShowMonModal(false);
      onClickMix(mon);
    },
    [onClickMix, setShowMonModal]
  );

  const handleOnClickEvolute = useCallback(
    mon => {
      setShowMonModal(false);
      onClickEvolute(mon);
    },
    [setShowMonModal, onClickEvolute]
  );

  return (
    <Wrapper className='mon-card-wrapper' {...restProps}>
      {!isMock && mon.mon && <RankTag rankCd={mon.rankCd} codes={codes} />}
      {!isMock && mon.mon && (
        <LevelTag level={mon.level} evolutable={checkIsEvolutable()} />
      )}
      <Card
        hoverable
        cover={renderCover()}
        onClick={onClick ? onClick : () => setShowMonModal(true)}
        className='mon-card'
      >
        {overlay && (
          <div className='hp-overlay'>
            {React.cloneElement(overlay, {
              onShowMonModal: () => setShowMonModal(true)
            })}
          </div>
        )}
        <div className='cost-section'>
          <Cost
            cost={isMock ? null : (mon.mon || mon)['cost']}
            isMock={isMock}
          />
        </div>
        <div className='attr-section'>{renderAttr()}</div>
      </Card>
      {bottomComponent}
      {!isMock && (
        <MonModal
          hideInfo={hideInfo}
          mon={mon}
          visible={showMonModal}
          onCancel={() => setShowMonModal(false)}
          codes={codes}
          prevMon={prevMon}
          mixable={mixable}
          onClickMix={handleOnClickMix}
          evolutable={evolutable}
          onClickEvolute={handleOnClickEvolute}
          user={user}
        />
      )}
    </Wrapper>
  );
};

export default memo(MonCard);
