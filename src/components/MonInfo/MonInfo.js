import React, { memo, useMemo } from 'react';
import { Row, Col } from 'antd';
import GradeTag from '../GradeTag';
import AttrTag from '../AttrTag/index';
import Cost from '../Cost/index';
import './MonInfo.less';
import RankTag from '../RankTag';

const MonInfo = ({ mon, codes }) => {
  const thisMon = useMemo(() => mon.mon || mon, [mon]);
  const col = useMemo(() => (mon.mon ? mon : null), [mon]);

  return (
    <Row className='mon-info'>
      <Col span={6}>이름</Col>
      <Col span={18}>{thisMon.name}</Col>
      {col && (
        <>
          <Col span={6}>랭크</Col>
          <Col span={18}>
            <RankTag rankCd={col.rankCd} codes={codes} />
          </Col>
        </>
      )}
      <Col span={6}>등급</Col>
      <Col span={18}>
        <GradeTag gradeCd={thisMon.gradeCd} /> (
        <span className='c-primary fw-700'>+{thisMon.point}</span> 콜렉션점수)
      </Col>
      <Col span={6}>속성</Col>
      <Col span={18}>
        <AttrTag attrCd={(col || mon).mainAttrCd} codes={codes} />
        {(col || mon).subAttrCd && (
          <AttrTag attrCd={(col || mon).subAttrCd} codes={codes} />
        )}
      </Col>
      <Col span={6}>코스트</Col>
      <Col span={18}>
        <Cost cost={thisMon.cost} />
      </Col>
      <Col span={6}>전투력</Col>
      <Col span={18}>
        <span className='c-primary fw-700'>
          {col ? col.baseTotal + col.addedTotal : thisMon.total}
        </span>
      </Col>
      <Col span={6}>피지컬</Col>
      <Col span={18}>
        {col ? '' : '평균 '}
        <span className='c-primary fw-700'>{(col || thisMon).height}</span>m /{' '}
        <span className='c-primary fw-700'>{(col || thisMon).weight}</span>kg
      </Col>
      <Col span={6}>진화</Col>
      <Col span={18}>
        {thisMon.nextMons && thisMon.nextMons.length > 0 ? (
          <div>
            <span className='c-primary fw-700'>
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
        <span className='c-primary fw-700'>
          {
            thisMon.monImages.filter(
              item => item.seq === (col ? col.imageSeq : 0)
            )[0].designer
          }
        </span>
        )
      </Col>
    </Row>
  );
};

export default memo(MonInfo);
