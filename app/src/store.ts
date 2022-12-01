import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./reducers/notificationsReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationsReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
