import React from 'react';
import { Dropdown, Button, Flex, Divider, Avatar, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { MdLogout } from 'react-icons/md';
import { redirect, useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import { UserOutlined } from '@ant-design/icons';

const ProfileSection = ({ collapsed }) => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const { Text } = Typography;

  const handleLinkClick = () => {
    navigate('/profile');
  };
  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const menuItems = [
    {
      key: '1',
      label: (
        <Button block type="link" onClick={handleLinkClick} style={{ border: 'none', outline: 'none' }}>
          Profile
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button
          block
          type="link"
          onClick={handleLogout}
          style={{
            border: 'none',
            outline: 'none',
            display: 'flex',
            justifyContent: 'space-arround',
            alignItems: 'center',
          }}
        >
          <Text style={{ position: 'relative' }}>Ելք</Text>
          <MdLogout style={{ position: 'absolute', top: '10px', right: '20px' }} />
        </Button>
      ),
    },
  ];
  return (
    <Flex vertical>
      <Divider style={{ margin: 0 }} />
      <Dropdown
        menu={{
          items: menuItems,
        }}
        placement="topLeft"
        arrow={{
          pointAtCenter: false,
        }}
      >
        <Button
          block
          style={{
            outline: 'none',
            border: 'none',
            background: 'none',
            height: '100%',
            padding: '12px 0',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Avatar icon={!collapsed ? <UserOutlined /> : null}>LS</Avatar>
          {!collapsed && 'Lilit Sargsyan'}
        </Button>
      </Dropdown>
    </Flex>
  );
};

export default ProfileSection;
