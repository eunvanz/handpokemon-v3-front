import React, { memo } from 'react';
import './SpinContainer.less';
import Spinner from '../Spinner';

const SpinContainer = () => {
  return (
    <div className='spin-container'>
      <div className='center-middle-aligner'>
        <Spinner />
      </div>
    </div>
  );
};

export default memo(SpinContainer);
