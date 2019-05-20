import React, { memo } from 'react';
import { Checkbox } from 'antd';

const MonImage = ({ item, onSelect, isSelected, isSelectable }) => {
  return (
    <div className='text-center'>
      <img src={item.url} alt='이미지' width='100%' />
      {isSelectable && (
        <Checkbox checked={isSelected} onClick={() => onSelect(item)} />
      )}
      <span>{item.designer}</span>
    </div>
  );
};

export default memo(MonImage);
