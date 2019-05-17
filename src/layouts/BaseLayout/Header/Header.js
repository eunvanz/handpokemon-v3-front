import React, { useCallback } from 'react';
import { PageHeader, Affix, Button } from 'antd';

import './Header.less';
import imgLogo from '../../../imgs/logo.png';

const HeaderView = ({
  user,
  history,
  onClickLogout,
  isOpenDrawer,
  onToggleDrawer
}) => {
  const getExtraComponent = useCallback(() => {
    const component = [];
    if (user) {
      component.push(
        <Button
          type='primary'
          key='sign-up'
          icon='setting'
          onClick={() => history.push('/setting')}
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
          onClick={() => history.push('/sign-up')}
        />
      );
      component.push(
        <Button
          type='primary'
          key='sign-in'
          icon='login'
          onClick={() => history.push('/sign-in')}
        />
      );
    }
    return component;
  }, []);

  const onClickToggleDrawer = useCallback(() => {
    onToggleDrawer(!isOpenDrawer);
  }, [isOpenDrawer]);

  return (
    <Affix offsetTop={0}>
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
