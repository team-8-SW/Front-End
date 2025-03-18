import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import ResetPassword from "./pages/login/ResetPassword";
//import Login from "./pages/login/Login"; // Import Login component

function App() {
  return (
    <>
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
