import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import DetailsEducation from "./pages/DetailedEducation/DetailsEducation";
import DetailsExperience from "./pages/Detailedexperience/DetailsExperience";
import DetailedSkills from "./pages/DetailedSkills/DetailedSkills";
import ExpForm from "./pages/Detailedexperience/ExpForm";
import LoginPage from './pages/login/LoginPage';
import SignUp from './pages/signup/SignUp';
import { GoogleLogin } from '@react-oauth/google';
import SocialLogin from './components/SocialLogin';
import ResetPassword from "./pages/login/ResetPassword";
import { useNavigate } from "react-router-dom";


import { fetchUser } from "./services/profile";
import ProtectedRoute from "./ProtectedRoute";

import EmailManagement from "./pages/UpdateEmail/EmailManagement";
import VerifyEmail from "./pages/UpdateEmail/VerifyEmail";
import NetworkPage from "./pages/network/NetworkPage";


function App() {
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/1")
      .then((res) => {
        setLoggedUser(res.data);
        console.log("User data fetched:", loggedUser);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="bg-backGroundColor min-h-screen">
      <Nav />
      <div>
      <Routes>
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile loggedUser={loggedUser} />
      </ProtectedRoute>
    }
  />
  <Route path="/" element={<Home />} />
  <Route
    path="/education"
    element={
      <ProtectedRoute>
        <DetailsEducation loggedUser={loggedUser} />
      </ProtectedRoute>
    }
  />
  <Route
    path="/experience"
    element={
      <ProtectedRoute>
        <DetailsExperience loggedUser={loggedUser} />
      </ProtectedRoute>
    }
  />
  <Route
    path="/skills"
    element={
      <ProtectedRoute>
        <DetailedSkills loggedUser={loggedUser} />
      </ProtectedRoute>
    }
  /> 
  <Route path="/network" element={<NetworkPage />} />
  <Route path="/login" element={<LoginPage setLoggedUser={setLoggedUser}/>} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/ResetPassword" element={<ResetPassword />} />
  {/* <Route path="/*" element={<NotFound />} /> */}
</Routes>
<Routes>
          <Route path="/EmailManagement" element={<EmailManagement/>}/>
          <Route path="/VerifyEmail" element={<VerifyEmail/>}/>
        </Routes>
       
      </div>
    </div>
  );
}

export default App;
