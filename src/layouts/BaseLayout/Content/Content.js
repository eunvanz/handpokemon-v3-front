import React from 'react';

import './Content.less';

const Content = ({ children }) => {
  return (
    <div className='hp-content'>
      {children}
      <div className='hp-footer'>made with ♥ for Pokémon® by CIVASOUL</div>
    </div>
  );
};

export default Content;
