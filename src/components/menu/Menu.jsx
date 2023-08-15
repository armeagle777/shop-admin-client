import { UploadOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { MdSpaceDashboard } from 'react-icons/md';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
} from 'react-device-detect';

import { menuItems } from '../../utils/constants';

const { Sider } = Layout;

const Menuslider = ({ isDarkMode, collapsed }) => {
    const menuColapseOptions = isMobile
        ? { breakpoint: 'lg', collapsedWidth: '0' }
        : { trigger: null, collapsible: true, collapsed: collapsed };
    return (
        <Sider {...menuColapseOptions} theme={isDarkMode ? 'dark' : 'light'}>
            <div className='demo-logo-vertical' />
            <Menu
                theme={isDarkMode ? 'dark' : 'light'}
                mode='inline'
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={menuItems}
            />
        </Sider>
    );
};

export default Menuslider;
