import React, { memo } from 'react';
import { Tag } from 'antd';
import { getDetailCdNmByDetailCd } from '../../libs/codeUtils';
import { ATTR_COLOR } from '../../constants/styles';
import './AttrTag.less';

const AttrTag = ({ attrCd, codes, ...restProps }) => {
  return (
    <Tag className='attr-tag' color={ATTR_COLOR[attrCd]} {...restProps}>
      {getDetailCdNmByDetailCd(attrCd, codes)}
    </Tag>
  );
};

export default memo(AttrTag);
