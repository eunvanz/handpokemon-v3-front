import React from 'react';
import { Layout } from 'antd';

import Header from './Header';
import Sidebar from './Sidebar';
import './BaseLayout.less';
import Content from './Content/Content';

const BaseLayout = props => {
  return (
    <Layout className='hp-base-layout'>
      <Header />
      <Layout>
        <Layout.Sider>
          <Sidebar />
        </Layout.Sider>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
