import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{
		width: "100vw",
		height: "95vh",
	}}>
      <Sider
        breakpoint="md"
        collapsedWidth="0px"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={"350px"}
      >
        <div className="demo-logo-vertical" />
        <Sidebar />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "10px 10px 0",
          }}
        >
          <div
            style={{
				height: "100%",
				width: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <MessageContainer />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
