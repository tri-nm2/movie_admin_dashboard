import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "features/authentication/authenticationSlice";

const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice.reducer,
  },
});

export default store;
