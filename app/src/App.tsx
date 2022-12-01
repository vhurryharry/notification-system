import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initUser } from "./actions/userActions";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import { getUser } from "./selectors/userSelectors";
import { AppDispatch } from "./store";

const App = () => {
  const user = useSelector(getUser);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return <Login />;
  }

  return (
    <div className="wrapper">
      <h1>Notifications system</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
