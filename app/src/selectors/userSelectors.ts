import { AppState } from "../store";

export const getUser = (state: AppState) => {
  return state.user.user;
};

export const isLoading = (state: AppState) => {
  return state.user.loading;
};

export const getError = (state: AppState) => {
  return state.user.error;
};
