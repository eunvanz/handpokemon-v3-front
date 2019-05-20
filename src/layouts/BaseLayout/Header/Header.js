import React, { useCallback } from 'react';
import { PageHeader, Affix, Button } from 'antd';

import './Header.less';
import imgLogo from '../../../imgs/logo.png';
import { isScreenSize, SCREEN_SIZE } from '../../../libs/screenSize';

const HeaderView = ({
  user,
  history,
  onClickLogout,
  isOpenDrawer,
  onToggleDrawer,
  onChangeRoute
}) => {
  const getExtraComponent = useCallback(() => {
    const component = [];
    if (user) {
      component.push(
        <Button
          type='primary'
          key='sign-up'
          icon='setting'
          onClick={() => onChangeRoute('/setting')}
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
          onClick={() => onChangeRoute('/sign-up')}
        />
      );
      component.push(
        <Button
          type='primary'
          key='sign-in'
          icon='login'
          onClick={() => onChangeRoute('/sign-in')}
        />
      );
    }
    return component;
  }, [user]);

  const onClickToggleDrawer = useCallback(() => {
    onToggleDrawer(!isOpenDrawer);
  }, [isOpenDrawer]);

  return (
    <Affix offsetTop={0} style={{ zIndex: 1000 }}>
      <PageHeader
        className='hp-header'
        title={[
          <Button
            key='menu-btn'
            type='primary'
            icon={isOpenDrawer ? 'menu-fold' : 'menu-unfold'}
            onClick={onClickToggleDrawer}
          />,
          <img
            key='logo'
            className='logo'
            src={imgLogo}
            alt='로고'
            height={30}
          />
        ]}
        extra={getExtraComponent()}
      />
    </Affix>
  );
};

export default HeaderView;
