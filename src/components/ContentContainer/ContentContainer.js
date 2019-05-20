import React, { memo } from 'react';
import './ContentContainer.less';

const ContentContainer = ({ children, ...restProps }) => {
  return (
    <div className='content-container' {...restProps}>
      {children}
    </div>
  );
};

export default memo(ContentContainer);
