import axios from "axios";
import React, { useState } from "react";
import useToken from "../../hooks/useToken";
import { API_URL } from "../../utils/api";
import "./Dashboard.css";

const Dashboard = () => {
  const { clearUser, user } = useToken();

  const [category, setCategory] = useState(1);
  const [message, setMessage] = useState("");

  const categories = [
    {
      id: 1,
      name: "Sports",
    },
    {
      id: 2,
      name: "Finance",
    },
    {
      id: 3,
      name: "Movies",
    },
  ];

  const logout = () => {
    clearUser();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(
        `${API_URL}/notifications`,
        {
          message,
          category,
        },
        {
          headers: {
            Authorization: `bearer ${user?.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="dashboard-wrapper">
      <button onClick={logout}>Sign out</button>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(parseInt(e.target.value))}
          >
            {categories.map((c) => (
              <option value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>
        <label>
          <p>Message</p>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
