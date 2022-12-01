import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type UserInfo = {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  accessToken: string;
};

export type UserState = {
  user?: UserInfo;
  error: any;
  loading: boolean;
};

const initialState: UserState = {
  user: undefined,
  error: "",
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initLogin: (state) => {
      state.loading = true;
    },
    completeLogin: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;

      sessionStorage.setItem("auth", JSON.stringify(state.user));

      if (state.user) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `bearer ${state.user.accessToken}`;
      }
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
    clearUser: (state) => {
      state.user = undefined;
      state.loading = false;
      state.error = "";

      sessionStorage.removeItem("auth");
    },
  },
});

// Action creators are generated for each case reducer function
export const { initLogin, completeLogin, setError, clearUser } =
  userSlice.actions;

export default userSlice.reducer;
