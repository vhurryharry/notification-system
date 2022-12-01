import React, { useState } from "react";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import { useSelector } from "react-redux";
import { getError } from "../../selectors/userSelectors";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const error = useSelector(getError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login(email, password));
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
