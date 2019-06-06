import React, { memo, useEffect, useState } from 'react';
import $ from 'jquery';
import './SpinContainer.less';
import Spinner from '../Spinner';

const SpinContainer = props => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const parentWidth = $('.spin-container').width();
    $('.always-center').width(parentWidth);
    setVisible(true);
  }, []);

  return (
    <div className='spin-container' {...props}>
      <div className='center-middle-aligner always-center'>
        <Spinner style={{ display: visible ? 'block' : 'none' }} />
      </div>
    </div>
  );
};

export default memo(SpinContainer);
