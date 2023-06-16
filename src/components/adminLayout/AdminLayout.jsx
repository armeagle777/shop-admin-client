import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

import Menuslider from "../menu/Menu";
import "./AdminLayout.scss";

const AdminLayout = ({ handleThemeChange, isDarkMode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ width: "100vw", minHeight: "100vh" }}>
      <Menuslider isDarkMode={isDarkMode} collapsed={collapsed} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "8px",
              width: 64,
              height: 64,
              outline: "none",
              border: "none",
            }}
          />
          <Button
            ghost
            type="primary"
            style={{ outline: "none", border: "none" }}
            icon={isDarkMode ? <BsSunFill /> : <BsMoonFill />}
            onClick={handleThemeChange}
          ></Button>
        </Header>
        <Content
          style={{
            margin: "8px",
            padding: 24,
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