import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Style from "common/components/SideBar/style.module.css";
import { useSelector } from "react-redux";

const { Sider } = Layout;

function createItem(key, label, icon) {
  return {
    key,
    label,
    icon,
  };
}

const sideMenuItems = [
  createItem(
    "movies",
    <NavLink to="/movieManagement">Quản lý phim</NavLink>,
    <VideoCameraOutlined />
  ),
  createItem(
    "user",
    <NavLink to="/userManagement">Quản lý người dùng</NavLink>,
    <UserOutlined />
  ),
];

function SideBar() {
  const userInfo = useSelector((state) => state.authentication.userInfo);

  const renderSideBar = () => {
    if (userInfo?.taiKhoan) {
      return (
        <div className={Style.sideBar}>
          <Sider
            style={{ height: 100 + "%" }}
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className={Style.space}></div>
            <Menu
              defaultSelectedKeys={["1"]}
              mode="inline"
              theme="dark"
              items={sideMenuItems}
            />
          </Sider>
        </div>
      );
    } else return <></>;
  };

  return <div>{renderSideBar()}</div>;
}

export default SideBar;
