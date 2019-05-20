import React, { memo, useCallback, useState } from 'react';
import { Card } from 'antd';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import { getMonImageUrl } from '../../libs/hpUtils';
import './MonCard.less';
import GradeTag from '../GradeTag';
import AttrTag from '../AttrTag';
import Cost from '../Cost/index';
import imgEmpty from '../../imgs/empty-mon.png';

const MonCard = ({ mon, col, hideInfo, codes, onClick }) => {
  const [isActiveVisibilitySensor, setIsActiveVisibilitySensor] = useState(
    true
  );

  const onChangeVisibility = useCallback(
    isVisible => {
      if (isVisible) setIsActiveVisibilitySensor(false);
    },
    [isActiveVisibilitySensor]
  );

  const renderCover = useCallback(() => {
    if (!hideInfo) {
      return (
        <div style={{ position: 'relative' }}>
          <Img
            src={[imgEmpty, getMonImageUrl(mon || col)]}
            alt='손켓몬 이미지'
            style={{ width: '100%' }}
            unloader={imgEmpty}
          />
        </div>
      );
    } else {
      // TODO
      return null;
    }
  }, [mon, col, hideInfo]);

  const renderAttr = useCallback(() => {
    const thisMon = mon || col.mon;
    const { gradeCd, mainAttrCd, subAttrCd } = thisMon;
    return (
      <>
        <GradeTag gradeCd={gradeCd} />
        <AttrTag attrCd={mainAttrCd} codes={codes} />
        {subAttrCd && <AttrTag attrCd={subAttrCd} codes={codes} />}
      </>
    );
  }, [mon, col, hideInfo]);

  return (
    // <VisibilitySensor
    //   active={isActiveVisibilitySensor}
    //   onChange={onChangeVisibility}
    //   partialVisibility
    // >
    //   {({ isVisible }) => {
    //     return (
    <Card
      hoverable
      cover={renderCover()}
      onClick={onClick}
      className='mon-card'
    >
      <p className='cost-section'>
        <Cost cost={(col ? col.mon : mon)['cost']} />
      </p>
      <p className='attr-section'>{renderAttr()}</p>
    </Card>
  );
  // </VisibilitySensor>
  // );
};

export default memo(MonCard);
