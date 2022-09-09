import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Space } from "antd";
import Style from "common/components/Header/style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "features/authentication/authenticationSlice";
import { useHistory } from "react-router-dom";

function CyberMovieHeader() {
  const userInfo = useSelector((state) => state.authentication.userInfo);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOutClick = () => {
    localStorage.removeItem("token");
    dispatch(addUser({}));
    history.push("/");
  };

  const renderHeader = () => {
    if (userInfo?.taiKhoan) {
      return (
        <div className={Style.header}>
          <div className={Style.logo}>
            <h1>Cybermovie</h1>
          </div>
          <div className={Style.user}>
            <a href="/#">
              <Space>
                <UserOutlined className={Style.userIcon} />
                Chào {userInfo.taiKhoan}
              </Space>
            </a>
            <a href="/#" onClick={() => handleLogOutClick()}>
              <span>Đăng Xuất</span>
            </a>
          </div>
        </div>
      );
    } else return <></>;
  };

  return <div>{renderHeader()}</div>;
}

export default CyberMovieHeader;
