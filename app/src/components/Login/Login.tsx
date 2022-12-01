import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { API_URL } from "../../utils/api";

type LoginProps = {
  setUser: Function;
};

const Login = ({ setUser }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const loginUser = async () => {
    return axios
      .post(
        `${API_URL}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.data)
      .catch((err) => setError(true));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(false);
    const user = await loginUser();
    setUser(user);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      {error && <div>Email address or password not valid</div>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
