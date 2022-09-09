import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Input } from "antd";
import UserForm from "features/main/components/UserForm";
import Style from "features/main/pages/UserManagement/style.module.css";
import instace from "api/instance";
import UserList from "features/main/components/userList";
import { groupId } from "common/contants/myContants";
import {
  CREATE_SUCCESS_MESSAGE,
  UPDATE_SUCCESS_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
} from "common/contants/messageContant";

function UserManagement() {
  const { Search } = Input;
  const { info, error, confirm } = Modal;

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [userList, setUserList] = useState([]);
  const [paginationConfig, setPaginationConfig] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
  });
  const keyWord = useRef("");

  //Hooks
  useEffect(() => {
    if (!keyWord.current) {
      fetchUserList();
    } else {
      fetchSearchUserList(keyWord.current);
    }
    //fetchUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationConfig.currentPage]);

  //Hooks

  //Api function
  const fetchUserList = async () => {
    try {
      const response = await instace.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang",
        method: "GET",
        params: {
          maNhom: groupId,
          soTrang: paginationConfig.currentPage,
          soPhanTuTrenTrang: paginationConfig.pageSize,
        },
      });

      const total = response.data.content.totalCount;
      setPaginationConfig({ ...paginationConfig, totalCount: total });
      setUserList(response.data.content.items);
    } catch (error) {
      console.log(error.response.data.content);
    }
  };

  const fetchSearchUserList = async (value) => {
    try {
      const response = await instace.request({
        url: "/api/QuanLyNguoiDung/TimKiemNguoiDungPhanTrang",
        method: "GET",
        params: {
          maNhom: groupId,
          tuKhoa: value,
          soTrang: paginationConfig.currentPage,
          soPhanTuTrenTrang: paginationConfig.pageSize,
        },
      });

      const total = response.data.content.totalCount;
      setPaginationConfig({ ...paginationConfig, totalCount: total });
      setUserList(response.data.content.items);
    } catch (error) {
      console.log(error.response.data.content);
    }
  };

  const deleteUser = async (value) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await instace.request({
        url: "/api/QuanLyNguoiDung/XoaNguoiDung",
        method: "DELETE",
        params: {
          TaiKhoan: value,
        },
      });

      showInfo(DELETE_SUCCESS_MESSAGE);
      reloadData();
    } catch (error) {
      showError(error.response.data.content);
    }
  };

  //Api function

  //Message box
  const showInfo = (message) => {
    info({
      title: "Thông báo",
      content: message,
    });
  };

  const showError = (message) => {
    error({
      title: "Thông báo",
      content: message,
    });
  };

  const showConfirm = (userName) => {
    confirm({
      title: "Xác nhận",
      content: `Bạn có muốn xóa người dùng ${userName}`,
      onOk() {
        deleteUser(userName);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  //Message box

  //Event
  const handleSubmit = async (user, actionType) => {
    switch (actionType) {
      case "Create":
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await instace.request({
            url: "/api/QuanLyNguoiDung/ThemNguoiDung",
            method: "POST",
            data: user,
          });

          showInfo(CREATE_SUCCESS_MESSAGE);
          reloadData();
        } catch (error) {
          showError(error.response.data.content);
        } finally {
          setOpen(false);
        }
        break;
      case "Update":
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await instace.request({
            url: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
            method: "POST",
            data: user,
          });

          showInfo(UPDATE_SUCCESS_MESSAGE);
          reloadData();
        } catch (error) {
          showError(error.response.data.content);
        } finally {
          setOpen(false);
        }
        break;
      default:
        break;
    }
  };

  const handleCreateButtonClick = () => {
    setSelectedUser({});
    setOpen(true);
  };

  const handleUpdateButtonClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteButtonClick = (userName) => {
    showConfirm(userName);
  };

  const onSearch = async (value) => {
    keyWord.current = value;

    if (paginationConfig.currentPage > 1) {
      setPaginationConfig({ ...paginationConfig, currentPage: 1 });
    } else {
      if (value === "") {
        fetchUserList();
      } else {
        fetchSearchUserList(value);
      }
    }
  };

  const handleChangePage = (currentPage) => {
    setPaginationConfig({ ...paginationConfig, currentPage: currentPage });
  };

  //Event

  //Other function
  const reloadData = () => {
    if (keyWord.current === "") {
      fetchUserList();
    } else {
      fetchSearchUserList(keyWord.current);
    }
  };
  //Other function

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
          className={Style.searchBox}
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 300,
          }}
        />

        <UserList
          userList={userList}
          paginationConfig={paginationConfig}
          handleChangePage={handleChangePage}
          handleUpdateButtonClick={handleUpdateButtonClick}
          handleDeleteButtonClick={handleDeleteButtonClick}
        />
      </div>
    </div>
  );
}

export default UserManagement;
