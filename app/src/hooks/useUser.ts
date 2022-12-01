import axios from "axios";
import { useState } from "react";

export type UserInfo = {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  accessToken: string;
};

const useUser = () => {
  const getUser = () => {
    const userString = sessionStorage.getItem("token");
    const userInfo = userString ? JSON.parse(userString) : null;

    if (userInfo) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `bearer ${userInfo.accessToken}`;
    }

    return userInfo;
  };

  const [user, setUser] = useState<UserInfo | undefined>(getUser);

  const saveUser = (userInfo: UserInfo) => {
    sessionStorage.setItem("token", JSON.stringify(userInfo));
    setUser(userInfo);

    axios.defaults.headers.common[
      "Authorization"
    ] = `bearer ${userInfo.accessToken}`;
  };

  const clearUser = () => {
    sessionStorage.removeItem("token");
    setUser(undefined);
  };

  return {
    setUser: saveUser,
    clearUser,
    user,
  };
};

export default useUser;
