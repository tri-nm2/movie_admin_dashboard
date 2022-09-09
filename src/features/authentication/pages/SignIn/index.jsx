import React from "react";
import { Input, Button } from "antd";
import Style from "features/authentication/pages/SignIn/style.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { REQUIRED_MESSAGE } from "common/contants/messageContant";
import { useHistory } from "react-router-dom";
import { signInAction } from "features/authentication/action";
import { useDispatch } from "react-redux";

function SingIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    taiKhoan: yup.string().required(REQUIRED_MESSAGE),
    matKhau: yup.string().required(REQUIRED_MESSAGE),
  });

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      signIn(values);
    },
  });

  const signIn = (values) => {
    dispatch(signInAction(values, history));
  };

  return (
    <div className={Style.formContainer}>
      <form onSubmit={formik.handleSubmit}>
        <div className={Style.inputGroup}>
          <Input
            placeholder="Tên đăng nhập"
            name="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
          {formik.errors.userName && formik.touched.userName && (
            <span className={Style.errorMessage}>{formik.errors.userName}</span>
          )}
        </div>
        <div className={Style.inputGroup}>
          <Input.Password
            placeholder="Mật khẩu"
            name="matKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <span className={Style.errorMessage}>{formik.errors.password}</span>
          )}
        </div>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}

export default SingIn;
