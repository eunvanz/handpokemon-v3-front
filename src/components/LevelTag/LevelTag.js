import React, { memo } from 'react';
import { Tag } from 'antd';
import './LevelTag.less';
import { COLOR } from '../../constants/styles';

const LevelTag = ({ level, isEvolutable }) => {
  return (
    <Tag
      className='level-tag'
      color={isEvolutable ? COLOR.DEEP_ORANGE : COLOR.LIGHT_BLUE}
    >
      LV. {level}
    </Tag>
  );
};

export default memo(LevelTag);
