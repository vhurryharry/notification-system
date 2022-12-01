import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import useToken from "./hooks/useToken";

const App = () => {
  const { user, setUser } = useToken();

  if (!user) {
    return <Login setUser={setUser} />;
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
