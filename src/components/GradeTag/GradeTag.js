import React, { memo } from 'react';
import { Tag } from 'antd';
import classNames from 'classnames';
import { GRADE_STYLE } from '../../constants/styles';
import { getClassNameFromGradeCd } from '../../libs/hpUtils';
import './GradeTag.less';

const GradeTag = ({ gradeCd }) => {
  return (
    <Tag
      className={classNames('grade-tag', getClassNameFromGradeCd(gradeCd))}
      style={GRADE_STYLE[gradeCd]}
    />
  );
};

export default memo(GradeTag);
