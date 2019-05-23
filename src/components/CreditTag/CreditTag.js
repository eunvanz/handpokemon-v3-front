import React, { memo } from 'react';
import { Tag } from 'antd';
import './CreditTag.less';

const CreditTag = ({ credit, lastTime }) => {
  return <Tag className='credit-tag'>{credit}</Tag>;
};

export default memo(CreditTag);
