import axios from "axios";
import { API_URL } from "../utils/api";

class NotificationsService {
  loadNotifications(userId: number) {
    return axios
      .get(`${API_URL}/users/${userId}/notifications`)
      .then((response) => response.data);
  }

  sendNotification(message: string, category: number) {
    return axios.post(`${API_URL}/notifications`, {
      message,
      category,
    });
  }
}

export default new NotificationsService();
