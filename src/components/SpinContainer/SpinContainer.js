import React, { memo } from 'react';
import { Spin, Icon } from 'antd';
import spinner from '../../imgs/spinner.svg';
import { isIE, isEdge } from '../../libs/commonUtils';
import './SpinContainer.less';

const SpinContainer = () => {
  return (
    <div className='spin-container'>
      <div className='center-middle-aligner'>
        <Spin
          indicator={
            isIE() || isEdge() ? (
              <Icon type='loading' />
            ) : (
              <img
                src={spinner}
                style={{ width: 40, height: 40 }}
                alt='spinner'
              />
            )
          }
        />
      </div>
    </div>
  );
};

export default memo(SpinContainer);
