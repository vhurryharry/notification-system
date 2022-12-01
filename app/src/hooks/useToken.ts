import { useState } from "react";

export type UserInfo = {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  accessToken: string;
};

const useToken = () => {
  const getUser = () => {
    const userString = sessionStorage.getItem("token");
    const userInfo = userString ? JSON.parse(userString) : null;
    return userInfo;
  };

  const [user, setUser] = useState<UserInfo | undefined>(getUser);

  const saveUser = (userInfo: UserInfo) => {
    sessionStorage.setItem("token", JSON.stringify(userInfo));
    setUser(userInfo);
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

export default useToken;
