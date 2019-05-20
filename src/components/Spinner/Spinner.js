import React, { memo } from 'react';
import { Spin, Icon } from 'antd';
import { isIE, isEdge } from '../../libs/commonUtils';
import spinner from '../../imgs/spinner.svg';

const Spinner = () => {
  return (
    <Spin
      indicator={
        isIE() || isEdge() ? (
          <Icon type='loading' />
        ) : (
          <img src={spinner} style={{ width: 40, height: 40 }} alt='spinner' />
        )
      }
    />
  );
};

export default memo(Spinner);