import React, { memo, useMemo } from 'react';
import { Row, Col } from 'antd';
import { getDetailCdNmByDetailCd } from '../../libs/codeUtils';
import GradeTag from '../GradeTag';
import AttrTag from '../AttrTag/index';
import Cost from '../Cost/index';

const MonInfo = ({ mon, codes }) => {
  const thisMon = useMemo(() => mon.mon || mon, [mon]);
  const col = useMemo(() => (mon.mon ? mon : null), [mon]);

  return (
    <Row>
      <Col span={6}>이름</Col>
      <Col span={18}>{thisMon.name}</Col>
      {col && (
        <>
          <Col span={6}>랭크</Col>
          <Col span={18}>{getDetailCdNmByDetailCd(thisMon.rankCd, codes)}</Col>
        </>
      )}
      <Col span={6}>등급</Col>
      <Col span={18}>
        <GradeTag gradeCd={thisMon.grade} /> (
        <span className='c-primary'>+{thisMon.point}</span> 콜렉션점수)
      </Col>
      <Col span={6}>속성</Col>
      <Col span={18}>
        <AttrTag attrCd={thisMon.mainAttrCd} />
        <AttrTag attrCd={thisMon.subAttrCd} />
      </Col>
      <Col span={6}>코스트</Col>
      <Col span={18}>
        <Cost cost={thisMon.cost} />
      </Col>
      <Col span={6}>전투력</Col>
      <Col span={18}>
        <span className='c-primary'>
          {col ? col.baseTotal + col.addedTotal : thisMon.total}
        </span>
      </Col>
      <Col span={6}>피지컬</Col>
      <Col span={18}>
        {col ? '' : '평균 '}
        <span className='c-primary'>{(col || thisMon).height}</span>m /{' '}
        <span className='c-primary'>{(col || thisMon).weight}</span>kg
      </Col>
      <Col span={6}>진화</Col>
      <Col span={18}>
        {thisMon.nextMons.length > 0 ? (
          <div>
            <span className='c-primary'>
              LV. {thisMon.nextMons[0].requiredLv}
            </span>
            부터 가능
          </div>
        ) : (
          '-'
        )}
      </Col>
      <Col span={24}>
        {thisMon.description} (designed by{' '}
        <span className='c-primary'>
          {thisMon.monImages.filter(
            item => item.seq === (col ? col.imageSeq : 0)
          )}
        </span>
        )
      </Col>
    </Row>
  );
};

export default memo(MonInfo);
