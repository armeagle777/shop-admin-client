import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { isMobile } from 'react-device-detect';
const { Header, Content } = Layout;

import Menuslider from '../menu/Menu';
import './AdminLayout.scss';
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = ({ handleThemeChange, isDarkMode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ width: '100vw', minHeight: '100vh' }}>
      <Menuslider isDarkMode={isDarkMode} collapsed={collapsed} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {!isMobile && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '8px',
                width: 64,
                height: 64,
                outline: 'none',
                border: 'none',
              }}
            />
          )}
          <Button
            ghost
            type="primary"
            style={{ outline: 'none', border: 'none' }}
            icon={isDarkMode ? <BsSunFill /> : <BsMoonFill />}
            onClick={handleThemeChange}
          ></Button>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme={isDarkMode ? 'dark' : 'light'}
          />
        </Header>
        <Content
          style={{
            margin: '8px',
            padding: isMobile ? '36px 0' : '36px 24px',
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
