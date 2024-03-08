import React, { useState, useEffect } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

import { Layout, theme } from "antd";
import "../../assets/css/home.scss";
import useConversation from "../../zustand/useConversation";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
const { Content, Sider } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  }, [selectedConversation]);

  return (
    <Layout
      style={{
        width: "100dvw",
        height: "99.4dvh",
      }}
    >
      <Sider
        collapsed={isCollapsed}
        breakpoint="md"
        collapsedWidth="0px"
        onBreakpoint={(broken) => {
          console.log("onBreakpoint", broken);
        }}
        onCollapse={(collapsed, type) => {
          setIsCollapsed(collapsed);
        }}
        trigger={isCollapsed ? <RiMenuUnfoldFill /> : <RiMenuFoldFill />}
        width={"min(85%, 350px)"}
        style={{
          backgroundColor: "#F0F9F8",
        }}
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
            <MessageContainer isCollapsed={isCollapsed}/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
