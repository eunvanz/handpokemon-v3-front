import React, { useState, useCallback, useEffect } from 'react';
import { Card } from 'antd';
import ContentContainer from '../../components/ContentContainer/index';

const AdminLayout = ({ children, history }) => {
  const [activeTabKey, setActiveTabKey] = useState(null);

  useEffect(() => {
    setActiveTabKey(history.location.pathname);
  }, []);

  const onTabChange = useCallback(key => {
    setActiveTabKey(key);
    history.push(key);
  }, []);

  return (
    <ContentContainer>
      <Card
        tabList={[
          {
            key: '/secret-garden/mon-list',
            tab: '손켓몬 목록'
          },
          {
            key: '/secret-garden/create-mon/new',
            tab: '손켓몬 등록'
          },
          {
            key: '/secret-garden/create-mon-image/new',
            tab: '손켓몬 이미지 등록'
          }
        ]}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {children}
      </Card>
    </ContentContainer>
  );
};

export default AdminLayout;
