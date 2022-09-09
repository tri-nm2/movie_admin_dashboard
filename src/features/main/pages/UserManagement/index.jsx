import React, { useEffect, useState } from "react";
import { Button, Modal, Input } from "antd";
import UserForm from "features/main/components/UserForm";
import Style from "features/main/pages/UserManagement/style.module.css";
import instace from "api/instance";

function UserManagement() {
  const { Search } = Input;
  const { info, error } = Modal;

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchUserList();
  });

  const fetchUserList = async () => {
    try {
      const response = await instace.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang",
        method: "GET",
        params: {
          maNhom: "GP08",
          soTrang: 1,
          soPhanTuTrenTrang: 10,
        },
      });
    } catch (error) {
      console.log(error.response.data.content);
    }
  };

  const showInfo = () => {
    info({
      title: "Thông báo",
      content: "Thêm người dùng thành công",
    });
  };

  const showError = (message) => {
    error({
      title: "Thông báo",
      content: message,
    });
  };

  const handleSubmit = async (user) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await instace.request({
        url: "/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: user,
      });

      showInfo();
    } catch (error) {
      console.log(error.response.data.content);
      showError(error.response.data.content);
    } finally {
      setOpen(false);
    }
  };

  const handleCreateButtonClick = () => {
    setSelectedUser({});
    setOpen(true);
  };

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <div className={Style.main}>
      <h1 className={Style.title}>Quản lý người dùng</h1>
      <Button type="primary" onClick={() => handleCreateButtonClick()}>
        Thêm người dùng
      </Button>

      <Modal
        title="Thông tin người dùng"
        centered
        open={open}
        destroyOnClose={true}
        onCancel={() => setOpen(false)}
        footer={[]}
      >
        <UserForm handleSubmit={handleSubmit} selectedUser={selectedUser} />
      </Modal>

      <div className={Style.userListContainer}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 300,
          }}
        />
      </div>
    </div>
  );
}

export default UserManagement;
