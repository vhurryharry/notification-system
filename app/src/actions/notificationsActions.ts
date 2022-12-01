import {
  completeLoadNotifications,
  completeSendNotification,
  initLoadNotifications,
  initSendNotification,
  setError,
} from "../reducers/notificationsReducer";
import notificationsService from "../services/notificationsService";
import { AppDispatch } from "../store";

export const loadNotifications = (userId: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(initLoadNotifications());

    return notificationsService
      .loadNotifications(userId)
      .then((result) => dispatch(completeLoadNotifications({ result })))
      .catch((error) => dispatch(setError({ error })));
  };
};

export const sendNotification = (message: string, category: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(initSendNotification());

    return notificationsService
      .sendNotification(message, category)
      .then(() => dispatch(completeSendNotification()))
      .catch((error) => dispatch(setError({ error })));
  };
};
