import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfoAction } from "./action";

const initialState = { userInfo: {} };

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfoAction.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export const { addUser } = authenticationSlice.actions;

export default authenticationSlice;
