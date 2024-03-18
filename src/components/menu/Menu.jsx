import { Flex, Layout, Menu } from 'antd';
import { isMobile } from 'react-device-detect';
import { useDrawMenu } from '../../hooks';

import ProfileSection from './profileSection.jsx/ProfileSection';

const { Sider } = Layout;

const Menuslider = ({ isDarkMode, collapsed }) => {
  const menuItems = useDrawMenu();
  const menuColapseOptions = isMobile
    ? { breakpoint: 'lg', collapsedWidth: '0' }
    : { trigger: null, collapsible: true, collapsed: collapsed };
  return (
    <Sider {...menuColapseOptions} theme={isDarkMode ? 'dark' : 'light'}>
      <Flex
        gap="middle"
        vertical
        justify="space-between"
        style={{ height: '100vh' }}
      >
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
