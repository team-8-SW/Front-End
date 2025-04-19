import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";

import Nav from "./components/Nav";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/login/ForgotPassword";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import DetailsEducation from "./pages/DetailedEducation/DetailsEducation";
import DetailsExperience from "./pages/Detailedexperience/DetailsExperience";
import DetailedSkills from "./pages/DetailedSkills/DetailedSkills";
import LoginPage from './pages/login/LoginPage';

import SignUp from './pages/signup/SignUp';
import ResetPassword from "./pages/login/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";

import EmailManagement from "./pages/UpdateEmail/EmailManagement";
import VerifyEmail from "./pages/UpdateEmail/VerifyEmail";
import NetworkPage from "./pages/network/NetworkPage";
import CreateCompanyForm from "./pages/company/CreateCompanyForm";
import Company from "./pages/company/Company";
import JobTitle from "./pages/company/JobTitle";
import JobDetailsForm from "./pages/company/JobDetailsForm";
import View from "./pages/ViewProfile/View";
import SearchResults from "./pages/network/SearchResults";
import ConnectionsList from "./pages/network/ConnectionList";
import ViewCompany from "./pages/company/ViewCompany";
import CompanyJobsTab from "./pages/company/CompanyJobsTab";
import EditCompanyForm from "./pages/company/EditCompanyPage";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
  
    
    const publicRoutes = [
      "/signup", 
      "/login", 
      "/forgot-password",
      "/reset-password"  // Added reset password as public
    ];
  
      axios.get("http://localhost:5000/api/profiles/", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        setLoggedUser({
          ...res.data,
          id: res.data.profile.id,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        if (err.response) {
          console.log("Error status:", err.response.status);
          console.log("Error data:", err.response.data);
        }
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
    }
  , [navigate]);
  
  

  return (
    <div className="bg-backGroundColor min-h-screen">
      {/* <Nav /> */}
      <Routes>

      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile loggedUser={loggedUser} />} />
        <Route path="/view/:id" element={<View loggedUser={loggedUser} />} />
        <Route path="/" element={<Home loggedUser={loggedUser} />} />
        <Route path="/education" element={<DetailsEducation loggedUser={loggedUser} />} />
        <Route path="/experience" element={<DetailsExperience loggedUser={loggedUser} />} />
        <Route path="/skills" element={<DetailedSkills loggedUser={loggedUser} />} />
        <Route path="/company/:companyid/*" element={<Company loggedUser={loggedUser} />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/login" element={<LoginPage setLoggedUser={setLoggedUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/jobtitle/:companyid" element={<JobTitle loggedUser={loggedUser} />} />
        <Route path="/jobdetails/:companyid" element={<JobDetailsForm loggedUser={loggedUser} />} />
        <Route path="/notifications" element={<NotificationsPage loggedUser={loggedUser} />} />
        <Route path="/EmailManagement" element={<EmailManagement />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/companyform" element={<CreateCompanyForm loggedUser={loggedUser} />} />
        {/* <Route path="/updatecompany/:companyid" element={<EditCompanyForm  />} /> */}
        <Route path="/SearchResults" element={<SearchResults />} />
        <Route path="/ConnectionList" element={<ConnectionsList />} />
        <Route path="/viewcompany/:companyid" element={<ViewCompany loggedUser={loggedUser} />} />
        <Route path="companyjobs" element={<CompanyJobsTab/>} />
      </Routes>
    </div>
  );
}

export default App;
