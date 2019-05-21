import React, { memo, useCallback } from 'react';
import { Card } from 'antd';
import { getMonImageUrl } from '../../libs/hpUtils';
import './MonCard.less';
import GradeTag from '../GradeTag';
import AttrTag from '../AttrTag';
import Cost from '../Cost/index';
import imgEmpty from '../../imgs/empty-mon.png';

const MonCard = ({ mon, hideInfo, codes, onClick }) => {
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
    const { gradeCd, mainAttrCd, subAttrCd } = thisMon;
    return (
      <>
        <GradeTag gradeCd={gradeCd} />
        <AttrTag attrCd={mainAttrCd} codes={codes} />
        {subAttrCd && <AttrTag attrCd={subAttrCd} codes={codes} />}
      </>
    );
  }, [mon, hideInfo]);

  return (
    <Card
      hoverable
      cover={renderCover()}
      onClick={onClick}
      className='mon-card'
    >
      <p className='cost-section'>
        <Cost cost={(mon.mon || mon)['cost']} />
      </p>
      <p className='attr-section'>{renderAttr()}</p>
    </Card>
  );
};

export default memo(MonCard);
