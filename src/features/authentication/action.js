import { createAsyncThunk } from "@reduxjs/toolkit";
import instace from "api/instance";
import { addUser } from "./authenticationSlice";

export const signInAction = (info, history) => {
  return async (dispatch) => {
    try {
      const response = await instace.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: info,
      });

      if (response.data.content.maLoaiNguoiDung === "QuanTri") {
        const token = response.data.content.accessToken;
        localStorage.setItem("token", token);
        dispatch(addUser(response.data.content));
        history.push("/movieManagement");
      } else {
        alert("Not a admin");
      }
    } catch (error) {
      alert(error.response.data.content);
    }
  };
};

export const fetchUserInfoAction = createAsyncThunk(
  "authentication/fetchUserInfo",
  async () => {
    try {
      const response = await instace.request({
        url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
      });

      return response.data.content;

    } catch (error) {
      console.log(error);
    }
  }
);
