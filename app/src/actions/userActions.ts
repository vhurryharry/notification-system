import axios from "axios";
import {
  initLogin,
  completeLogin,
  setError,
  clearUser,
} from "../reducers/userReducer";
import userService from "../services/userService";
import { AppDispatch } from "../store";

export const login = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(initLogin());

    return userService
      .login(email, password)
      .then((user) => dispatch(completeLogin({ user })))
      .catch((error) => dispatch(setError({ error })));
  };
};

export const logoutUser = () => {
  return (dispatch: AppDispatch) => {
    return dispatch(clearUser());
  };
};

export const initUser = () => {
  return (dispatch: AppDispatch) => {
    const userString = sessionStorage.getItem("auth");
    const user = userString ? JSON.parse(userString) : null;

    return dispatch(completeLogin({ user }));
  };
};
