import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React from "react";

function UserList(props) {
  //   const [currentPage, pageSize, total] = props.paginationConfig;

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, user) => (
        <>
          <Button
            key={user.dataIndex}
            icon={<EditOutlined />}
            style={{ marginRight: 10 }}
            onClick={() => {
              props.handleUpdateButtonClick(user);
            }}
          ></Button>
          <Button
            key={user.dataIndex}
            icon={<DeleteOutlined />}
            onClick={() => {
              props.handleDeleteButtonClick(user.taiKhoan);
            }}
          ></Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={props.userList}
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
  );
}

export default UserList;
