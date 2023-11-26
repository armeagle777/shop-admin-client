import { UploadOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, Flex, Divider } from 'antd';
import { MdSpaceDashboard } from 'react-icons/md';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import { menuItems } from '../../utils/constants';
import ProfileSection from './profileSection.jsx/ProfileSection';

const { Sider } = Layout;

const Menuslider = ({ isDarkMode, collapsed }) => {
  const menuColapseOptions = isMobile
    ? { breakpoint: 'lg', collapsedWidth: '0' }
    : { trigger: null, collapsible: true, collapsed: collapsed };
  return (
    <Sider {...menuColapseOptions} theme={isDarkMode ? 'dark' : 'light'}>
      <Flex gap="middle" vertical justify="space-between" style={{ height: '100vh' }}>
        <div style={{ height: '100vh' }}>
          <div className="demo-logo-vertical" />
          <Menu
            theme={isDarkMode ? 'dark' : 'light'}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            items={menuItems}
          />
        </div>
        <ProfileSection collapsed={collapsed} />
      </Flex>
    </Sider>
  );
};

export default Menuslider;
