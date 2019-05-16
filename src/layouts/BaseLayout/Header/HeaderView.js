import React, { useCallback } from 'react';
import { PageHeader, Affix, Button } from 'antd';

import './Header.less';
import imgLogo from '../../../imgs/logo.png';

const HeaderView = ({ user, goTo, onClickLogout }) => {
  const getExtraComponent = useCallback(() => {
    const component = [];
    if (user) {
      component.push(
        <Button
          type='primary'
          key='sign-up'
          icon='setting'
          onClick={() => goTo('/setting')}
        />
      );
      component.push(
        <Button
          type='primary'
          key='sign-in'
          icon='logout'
          onClick={onClickLogout}
        />
      );
    } else {
      component.push(
        <Button
          type='primary'
          key='sign-up'
          icon='user-add'
          onClick={() => goTo('/sign-up')}
        />
      );
      component.push(
        <Button
          type='primary'
          key='sign-in'
          icon='login'
          onClick={() => goTo('/sign-in')}
        />
      );
    }
    return component;
  }, []);

  return (
    <Affix offsetTop={0}>
      <PageHeader
        className='hp-header'
        title={<img src={imgLogo} alt='로고' height={30} />}
        extra={getExtraComponent()}
      />
    </Affix>
  );
};

export default HeaderView;
