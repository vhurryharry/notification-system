import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./reducers/notificationsReducer";

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
