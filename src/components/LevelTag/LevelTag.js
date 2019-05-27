import React, { memo } from 'react';
import { Tag } from 'antd';
import './LevelTag.less';
import { COLOR } from '../../constants/styles';

const LevelTag = ({ level, evolutable, old, ...restProps }) => {
  return (
    <Tag
      className='level-tag'
      color={
        old ? COLOR.GRAY : evolutable ? COLOR.DEEP_ORANGE : COLOR.LIGHT_BLUE
      }
      {...restProps}
    >
      LV. {level}
    </Tag>
  );
};

export default memo(LevelTag);
