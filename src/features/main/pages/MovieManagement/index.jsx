import React, { useRef, useState } from "react";
import Style from "features/main/pages/MovieManagement/style.module.css";
import { Button, Modal } from "antd";
import MovieForm from "features/main/components/MovieForm";
import instace from "api/instance";
import {
  CREATE_SUCCESS_MESSAGE,
  UPDATE_SUCCESS_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
} from "common/contants/messageContant";

function MovieManagement() {
  const [open, setOpen] = useState(false);
  const [selectMovie, setSelectedMovie] = useState({});
  const { info, error, confirm } = Modal;

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
        // deleteUser(userName);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  //Message box

  //Events
  const handleCreateButtonClick = () => {
    setSelectedMovie({});
    setOpen(true);
  };

  const handleSubmit = async (movie, action) => {
    switch (action) {
      case "Create":
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await instace.request({
            url: "/api/QuanLyPhim/ThemPhimUploadHinh",
            method: "POST",
            data: movie,
          });

          showInfo(CREATE_SUCCESS_MESSAGE);
        } catch (error) {
          showError(error.response.data.content);
        }
        break;
      default:
        break;
    }
  };
  //Events

  return (
    <div className={Style.main}>
      <h1 className={Style.title}>Quản lý phim</h1>
      <Button type="primary" onClick={() => handleCreateButtonClick()}>
        Thêm phim
      </Button>

      <Modal
        title="Thông tin phim"
        centered
        open={open}
        destroyOnClose={true}
        onCancel={() => {
          setOpen(false);
        }}
        footer={[]}
      >
        <MovieForm selectMovie={selectMovie} handleSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

export default MovieManagement;
