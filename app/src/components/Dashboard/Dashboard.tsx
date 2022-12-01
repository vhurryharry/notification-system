import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadNotifications } from "../../actions/notificationsActions";
import { logoutUser } from "../../actions/userActions";
import { Notification } from "../../reducers/notificationsReducer";
import {
  getNotifications,
  isLoading,
} from "../../selectors/notificationsSelectors";
import { getUser } from "../../selectors/userSelectors";
import { AppDispatch } from "../../store";
import { API_URL } from "../../utils/api";
import "./Dashboard.css";

const Dashboard = () => {
  const user = useSelector(getUser);

  const [category, setCategory] = useState(1);
  const [message, setMessage] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const loadingNotifications = useSelector(isLoading);
  const notifications = useSelector(getNotifications);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loadingNotifications) {
      dispatch(loadNotifications(user.id));
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

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
    dispatch(logoutUser());
    navigate(0);
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
      .then(() => {
        setMessage("");
        setCategory(1);

        dispatch(loadNotifications(user!.id));
      });
  };

  const renderNotification = (notification: Notification) => {
    return (
      <tr key={"notification" + notification.id}>
        <th>{notification.category.name}</th>
        <th>{notification.channel.name}</th>
        <th>{notification.message}</th>
        <th>{notification.sentAt}</th>
      </tr>
    );
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
              <option key={"category" + c.id} value={c.id}>
                {c.name}
              </option>
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
          <button type="submit" disabled={!message}>
            Send
          </button>
        </div>
      </form>

      {!loadingNotifications && notifications && notifications.length > 0 && (
        <>
          <h4>Notification History</h4>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Channel</th>
                <th>Message</th>
                <th>Sent At</th>
              </tr>
            </thead>
            <tbody>{notifications.map(renderNotification)}</tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Dashboard;
