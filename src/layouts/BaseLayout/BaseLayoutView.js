import React from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';

import Header from './Header';
import Sidebar from './Sidebar';
import './BaseLayout.less';
import Content from './Content/Content';

const BaseLayoutView = ({
  user,
  onToggleDrawer,
  isOpenDrawer,
  children,
  history,
  onClickLogout
}) => {
  return (
    <Layout
      className={classNames(
        'hp-base-layout',
        isOpenDrawer ? 'show-drawer' : 'hide-drawer'
      )}
    >
      <Header
        user={user}
        onToggleDrawer={onToggleDrawer}
        onClickLogout={onClickLogout}
        isOpenDrawer={isOpenDrawer}
        history={history}
      />
      <Layout className='hp-content-layout'>
        <Sidebar history={history} />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayoutView;
