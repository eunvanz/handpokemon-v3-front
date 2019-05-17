import React, { useState, useCallback } from 'react';
import { Menu, Icon, List, Avatar } from 'antd';
import './Sidebar.less';

const SidebarView = ({ user, history }) => {
  const [openKeys, setOpenKeys] = useState([history.location.pathname]);

  const onClickMenuItem = useCallback(key => {
    setOpenKeys([key]);
    history.push(key);
  }, []);

  return (
    <div className='hp-sidebar'>
      <List.Item.Meta
        className='user-info'
        avatar={<Avatar src={user ? user.profileImage : null} icon='user' />}
        title={user ? user.nickname : '로그인을 해주세요.'}
        description={user ? user.introduce : null}
      />
      <Menu theme='dark' mode='inline'>
        <Menu.Item key='/' onClick={() => onClickMenuItem('/')}>
          <Icon type='home' />
          <span>홈</span>
        </Menu.Item>
        {user && (
          <Menu.Item
            key='/collection'
            onClick={() => onClickMenuItem('/collection')}
          >
            <Icon type='appstore' />
            <span>내 콜렉션</span>
          </Menu.Item>
        )}
        {user && (
          <Menu.Item key='/giftbox' onClick={() => onClickMenuItem('/giftbox')}>
            <Icon type='gift' />
            <span>내 선물함</span>
          </Menu.Item>
        )}
        <Menu.Item key='/pick' onClick={() => onClickMenuItem('/pick')}>
          <Icon type='experiment' />
          <span>손켓몬 채집</span>
        </Menu.Item>
        <Menu.Item key='/battle' onClick={() => onClickMenuItem('/battle')}>
          <Icon type='fire' />
          <span>손켓몬 시합</span>
        </Menu.Item>
        <Menu.SubMenu
          key='ranking'
          title={
            <span>
              <Icon type='trophy' />
              <span>랭킹</span>
            </span>
          }
        >
          <Menu.Item
            key='/ranking/collection'
            onClick={() => onClickMenuItem('/ranking/collection')}
          >
            <span>콜렉션랭킹</span>
          </Menu.Item>
          <Menu.Item
            key='/ranking/battle'
            onClick={() => onClickMenuItem('/ranking/battle')}
          >
            <span>시합랭킹</span>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key='/shop' onClick={() => onClickMenuItem('/shop')}>
          <Icon type='shop' />
          <span>상점</span>
        </Menu.Item>
        <Menu.SubMenu
          key='community'
          title={
            <span>
              <Icon type='coffee' />
              <span>커뮤니티</span>
            </span>
          }
        >
          <Menu.Item
            key='/community/notice'
            onClick={() => onClickMenuItem('/community/notice')}
          >
            <span>공지사항</span>
          </Menu.Item>
          <Menu.Item
            key='/community/free'
            onClick={() => onClickMenuItem('/community/free')}
          >
            <span>자유게시판</span>
          </Menu.Item>
          <Menu.Item
            key='/community/guide'
            onClick={() => onClickMenuItem('/community/guide')}
          >
            <span>게임가이드</span>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key='/workshop'
          onClick={() => onClickMenuItem('/community/workshop')}
        >
          <Icon type='tool' />
          <span>손켓몬 공방</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SidebarView;
