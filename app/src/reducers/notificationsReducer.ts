import { createSlice } from "@reduxjs/toolkit";

export type Notification = {
  id: number;
  message: string;
  sentAt: string;
  category: {
    id: number;
    name: string;
  };
  channel: {
    id: number;
    name: string;
  };
};

export type NotificationsType = {
  notifications: Array<Notification>;
  totalCount: number;
  error: string;
  loading: boolean;
  sending: boolean;
};

const initialState: NotificationsType = {
  notifications: [],
  totalCount: 0,
  error: "",
  loading: false,
  sending: false,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    initLoadNotifications: (state) => {
      state.loading = true;
    },
    completeLoadNotifications: (state, action) => {
      state.notifications = action.payload.result.notifications;
      state.totalCount = action.payload.result.totalCount;
      state.loading = false;
    },
    initSendNotification: (state) => {
      state.sending = true;
    },
    completeSendNotification: (state) => {
      state.sending = false;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initLoadNotifications,
  completeLoadNotifications,
  initSendNotification,
  completeSendNotification,
  clearNotifications,
  setError,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
