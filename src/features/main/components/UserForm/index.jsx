import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import * as yup from "yup";
import { useFormik } from "formik";
import Style from "./style.module.css";
import instace from "api/instance";
import {
  REQUIRED_MESSAGE,
  EMAIL_FORMAT_MESSAGE,
  NAME_CHARACTER_MESSAGE,
  PHONENUMBER_CHARACTER_MESSAGE,
} from "common/contants/messageContant";
import { groupId } from "common/contants/myContants";

const { Option } = Select;

function UserForm(props) {
  const [userTypes, setUserTypes] = useState([]);

  const schema = yup.object().shape({
    taiKhoan: yup.string().required(REQUIRED_MESSAGE),
    matKhau: yup.string().required(REQUIRED_MESSAGE),
    email: yup.string().required(REQUIRED_MESSAGE).email(EMAIL_FORMAT_MESSAGE),
    soDt: yup
      .string()
      .required(REQUIRED_MESSAGE)
      .matches(/^[0-9 ]+$/g, PHONENUMBER_CHARACTER_MESSAGE),
    hoTen: yup
      .string()
      .required(REQUIRED_MESSAGE)
      .matches(
        /^[A-Za-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ ]+$/g,
        NAME_CHARACTER_MESSAGE
      ),
  });

  const formik = useFormik({
    initialValues: {
      taiKhoan: props.selectedUser.taiKhoan,
      matKhau: props.selectedUser.matKhau,
      email: props.selectedUser.email,
      soDt: props.selectedUser.soDt,
      maNhom: "",
      maLoaiNguoiDung: props.selectedUser.maLoaiNguoiDung,
      hoTen: props.selectedUser.hoTen,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (!values.maLoaiNguoiDung) {
        values.maLoaiNguoiDung = userTypes[0].maLoaiNguoiDung;
      }
      const user = { ...values, maNhom: groupId };

      let actionType;
      if (props.selectedUser.taiKhoan) {
        actionType = "Update";
      } else {
        actionType = "Create";
      }

      props.handleSubmit(user, actionType);
    },
  });

  const fetchUserType = async () => {
    try {
      const response = await instace.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
        method: "GET",
      });

      setUserTypes(response.data.content);
    } catch (error) {}
  };

  const handleChangeUserType = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  useEffect(() => {
    fetchUserType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={Style.form}>
      <form onSubmit={formik.handleSubmit}>
        <div className={Style.inputGroup}>
          <span className={Style.label}>Tài khoản</span>
          <Input
            placeholder="Tài khoản"
            name="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.taiKhoan}
          />
          {formik.errors.taiKhoan && formik.touched.taiKhoan && (
            <span className={Style.errorMessage}>{formik.errors.taiKhoan}</span>
          )}
        </div>

        <div className={Style.inputGroup}>
          <span className={Style.label}>Mật khẩu</span>
          <Input.Password
            placeholder="Mật khẩu"
            name="matKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.matKhau}
          />
          {formik.errors.matKhau && formik.touched.matKhau && (
            <span className={Style.errorMessage}>{formik.errors.matKhau}</span>
          )}
        </div>

        <div className={Style.inputGroup}>
          <span className={Style.label}>Email</span>
          <Input
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <span className={Style.errorMessage}>{formik.errors.email}</span>
          )}
        </div>

        <div className={Style.inputGroup}>
          <span className={Style.label}>Số điện thoại</span>
          <Input
            placeholder="Số điện thoại"
            name="soDt"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.soDt}
          />
          {formik.errors.soDt && formik.touched.soDt && (
            <span className={Style.errorMessage}>{formik.errors.soDt}</span>
          )}
        </div>

        <div className={Style.inputGroup}>
          <span className={Style.label}>Họ tên</span>
          <Input
            placeholder="Họ tên"
            name="hoTen"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.hoTen}
          />
          {formik.errors.hoTen && formik.touched.hoTen && (
            <span className={Style.errorMessage}>{formik.errors.hoTen}</span>
          )}
        </div>

        <span className={Style.label}>Loại khách hàng</span>
        <Select
          className={Style.userType}
          value={formik.values.maLoaiNguoiDung || userTypes[0]?.maLoaiNguoiDung}
          name="maLoaiNguoiDung"
          onChange={handleChangeUserType}
        >
          {userTypes?.map((type) => {
            return (
              <Option key={type.maLoaiNguoiDung} value={type.maLoaiNguoiDung}>
                {type.tenLoai}
              </Option>
            );
          })}
        </Select>

        <Button type="primary" htmlType="submit">
          Gửi
        </Button>
      </form>
    </div>
  );
}

export default UserForm;
