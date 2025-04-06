import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import DetailsEducation from "./pages/DetailedEducation/DetailsEducation";
import DetailsExperience from "./pages/Detailedexperience/DetailsExperience";
import DetailedSkills from "./pages/DetailedSkills/DetailedSkills";
//import ExpForm from "./pages/Detailedexperience/ExpForm";
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
import CreateCompanyForm from "./pages/company/CreateCompanyForm";
import Company from "./pages/company/Company";
import JobTitle from "./pages/company/JobTitle";
import JobDetailsForm from "./pages/company/JobDetailsForm";
import View from "./pages/ViewProfile/View";


function App() {
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      navigate("/login"); // Redirect to login if no user is found
    } else {
      fetchUser(setLoggedUser);
      
    }
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
  <Route
    // path="/view/:id"
     path="/view"
    element={
      <ProtectedRoute>
        <View loggedUser={loggedUser} />  
      </ProtectedRoute>
    }
  />
  <Route path="/" element={<Home loggedUser={loggedUser}/>} />
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
  <Route
    path="/company/*"
    element={
      <ProtectedRoute>
        <Company loggedUser={loggedUser} />
      </ProtectedRoute>
    }
  />
  <Route path="/login" element={<LoginPage setLoggedUser={setLoggedUser}/>} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/ResetPassword" element={<ResetPassword />} />
  <Route path="/jobtitle" element={<JobTitle loggedUser={loggedUser} />} />
  <Route path="/jobdetails" element={<JobDetailsForm loggedUser={loggedUser} />} />
  {/* <Route path="/*" element={<NotFound />} /> */}
  <Route path="/notifications" element={<NotificationsPage loggedUser={loggedUser} />} />
</Routes>
        <Routes>
          <Route path="/EmailManagement" element={<EmailManagement/>}/>
          <Route path="/VerifyEmail" element={<VerifyEmail/>}/>
          <Route path="/companyform" element={< CreateCompanyForm loggedUser={loggedUser}/>}/>
          

        </Routes> 
      </div>
    </div>
  );
}

export default App;
