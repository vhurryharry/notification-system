import { AppState } from "../store";

export const getNotifications = (state: AppState) => {
  return state.notifications.notifications;
};

export const getTotalCount = (state: AppState) => {
  return state.notifications.totalCount;
};

export const isLoading = (state: AppState) => {
  return state.notifications.loading;
};

export const isSending = (state: AppState) => {
  return state.notifications.sending;
};

export const getError = (state: AppState) => {
  return state.notifications.error;
};
