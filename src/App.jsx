import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";

import Nav from "./components/Nav";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import DetailsEducation from "./pages/DetailedEducation/DetailsEducation";
import DetailsExperience from "./pages/Detailedexperience/DetailsExperience";
import DetailedSkills from "./pages/DetailedSkills/DetailedSkills";
import LoginPage from './pages/login/LoginPage';
import SignUp from './pages/signup/SignUp';
import ResetPassword from "./pages/login/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";

import EmailManagement from "./pages/UpdateEmail/EmailManagement";

import NetworkPage from "./pages/network/NetworkPage";
import CreateCompanyForm from "./pages/company/CreateCompanyForm";
import Company from "./pages/company/Company";
import JobTitle from "./pages/company/JobTitle";
import JobDetailsForm from "./pages/company/JobDetailsForm";
import View from "./pages/ViewProfile/View";
import SearchResults from "./pages/network/SearchResults";
import ConnectionsList from "./pages/network/ConnectionList";
import ViewCompany from "./pages/company/ViewCompany";


function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    
    const publicRoutes = ["/signup", "/login", "/ResetPassword","profile"];
  
    if (!token && !publicRoutes.includes(window.location.pathname)) {
      navigate("/login");
    } else if (token) {
      axios.get("http://localhost:5000/api/profiles/", {
        headers: {
          'Authorization': `Bearer ${token}`,
          //'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        setLoggedUser({
          ...res.data,
          //id: "",
        });
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        // if (err.response?.status === 401) {
        //   localStorage.removeItem("token");
        //   navigate("/login");
        // }
      });
    }
    console.log("loggeduser:", loggedUser);
  }, [navigate]);
  
  

  return (
    <div className="bg-backGroundColor min-h-screen">
      <Nav />
      <Routes>
        <Route path="/profile" element={<Profile loggedUser={loggedUser} />} />
        <Route path="/view" element={<ProtectedRoute><View loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/" element={<Home loggedUser={loggedUser} />} />
        <Route path="/education" element={<DetailsEducation loggedUser={loggedUser} />} />
        <Route path="/experience" element={<DetailsExperience loggedUser={loggedUser} />} />
        <Route path="/skills" element={<DetailedSkills loggedUser={loggedUser} />} />
        <Route path="/company/*" element={<Company loggedUser={loggedUser} />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/login" element={<LoginPage setLoggedUser={setLoggedUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/jobtitle" element={<JobTitle loggedUser={loggedUser} />} />
        <Route path="/jobdetails" element={<JobDetailsForm loggedUser={loggedUser} />} />
        <Route path="/notifications" element={<NotificationsPage loggedUser={loggedUser} />} />
        <Route path="/EmailManagement" element={<EmailManagement />} />
       
        <Route path="/companyform" element={<CreateCompanyForm loggedUser={loggedUser} />} />
        <Route path="/SearchResults" element={<SearchResults loggedUser={loggedUser} />} />
        <Route path="/ConnectionList" element={<ConnectionsList />} />
        <Route path="/viewcompany" element={<ViewCompany loggedUser={loggedUser} />} />
      </Routes>
    </div>
  );
}

export default App;
