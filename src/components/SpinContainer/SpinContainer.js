import React from 'react';
import { Spin, Icon } from 'antd';
// import spinner from '../../imgs/index.gooey-ring-spinner.svg'
// import spinner from '../../imgs/index.palette-rotating-ring-loader.svg'
import spinner from '../../imgs/spinner.svg';
import { isIE, isEdge } from '../../libs/commonUtils';

const SpinContainer = ({ height = '48vh', size, tip }) => {
  return (
    <div
      style={{ textAlign: 'center', paddingTop: height, paddingBottom: height }}
    >
      <Spin
        size={size}
        tip={tip}
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
  );
};

export default SpinContainer;
