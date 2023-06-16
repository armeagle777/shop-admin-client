import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { MdSpaceDashboard } from "react-icons/md";

import { menuItems } from "../../utils/constants";

const { Sider } = Layout;

const Menuslider = ({ isDarkMode, collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme={isDarkMode ? "dark" : "light"}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme={isDarkMode ? "dark" : "light"}
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Menuslider;
