import axios from "axios";
import { API_URL } from "../utils/api";

class UserService {
  login(email: string, password: string) {
    return axios
      .post(`${API_URL}/login`, {
        email,
        password,
      })
      .then((response) => response.data);
  }
}

export default new UserService();
