import React from "react";
import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import Style from "./style.module.css";

function MovieList(props) {
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      width: "10%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: "10%",
      render: (_, movie) => (
        <>
          <img
            className={Style.thumbNail}
            src={movie.hinhAnh}
            alt="error"
          ></img>
        </>
      ),
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: "15%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: "40%",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "10%",
      render: (_, movie) => (
        <>
          <Button
            key={movie.dataIndex}
            icon={<EditOutlined />}
            style={{ marginRight: 10 }}
            onClick={() => {
              props.handleUpdateButtonClick(movie);
            }}
          ></Button>
          <Button
            key={movie.dataIndex}
            icon={<DeleteOutlined />}
            onClick={() => {
              props.handleDeleteButtonClick(movie.maPhim);
            }}
          ></Button>
          <Button
            key={movie.dataIndex}
            icon={<CopyOutlined />}
            style={{ marginTop: 10 }}
            onClick={() => {
              props.handleCreateScheduleButtonClick(movie);
            }}
          ></Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <div>
        <Table
          // rowKey="maPhim"
          columns={columns}
          dataSource={props.movieList}
          pagination={{
            current: props.paginationConfig.currentPage,
            pageSize: props.paginationConfig.pageSize,
            total: props.paginationConfig.totalCount,
            showSizeChanger: false,
            onChange: (page) => {
              props.handleChangePage(page);
            },
          }}
        />
      </div>
    </div>
  );
}

export default MovieList;
