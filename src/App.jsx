import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import NewMessageWindow from "./pages/messages/NewMessageWindow";
import ForgotPassword from "./pages/login/ForgotPassword";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import DetailsEducation from "./pages/DetailedEducation/DetailsEducation";
import DetailsExperience from "./pages/Detailedexperience/DetailsExperience";
import DetailedSkills from "./pages/DetailedSkills/DetailedSkills";
import LoginPage from './pages/login/LoginPage';
import BlockedUsersList from "./pages/network/BlockedUsersList";
import ConversationList from "./pages/messages/ConversationList";
import MessageRequests from "./pages/messages/MessageRequestsPage";
import ChatWindow from "./pages/messages/ChatWindow";
import SignUp from './pages/signup/SignUp';
import ResetPassword from "./pages/login/ResetPassword";
import PendingConnections from "./pages/network/PendingConnections";
import ProtectedRoute from "./ProtectedRoute";
import FollowingList from "./pages/network/followinglist";

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
import MessagesPage from "./pages/messages/MessagesPage";
import MainPage from "./pages/jobs/MainPage";
import JobHome from "./pages/jobs/JobHome";
import MyJobs from "./pages/jobs/MyJobs";
import EmployerJobTitle from "./pages/jobs/EmployerJobtitle";
import EmployerJobDetailsForm from "./pages/jobs/EmployerJobDetailsform";
import JobApplications from "./pages/company/JobApplications";
import AdminHome from "./pages/adminhome/AdminHome";
import MyPostedJobs from "./pages/jobs/MyPostedJobs";
import MyJobApplications from "./pages/jobs/MyJobApplications";
import AdminJobsPage from "./pages/adminjob/AdminJobsPage";
import FlaggedJobsPage from "./pages/adminjob/FlaggedJobsPage";
import StripeProvider from "./pages/payment/StripeProvider";
import PaymentPage from "./pages/payment/PaymentPage";

import AdminReportsPage from "./pages/adminreport/AdminReportsPage";
import {api} from "./services/profile";
import UpdatePassword from "./pages/UpdateEmail/UpdatePassword";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);
  const publicRoutes = ["/signup", "/login", "/forgot-password", "/reset-password"];
    const isPublic = publicRoutes.some((route) => location.pathname.startsWith(route));
    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      console.log("isPublic:", isPublic, "| path:", location.pathname);
    
      if (isPublic) {
        return; // ✅ Skip auth fetch
      }
    
      api
        .get("/api/profiles/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setLoggedUser({
            ...res.data,
            id: res.data.profile.id,
          });
          console.log("User data:", res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        });
    }, [navigate, location.pathname]);
    
  

  return (
    <div className="bg-backGroundColor min-h-screen">
      {!isPublic && (
  <Nav setSearching={setSearching} />
)}

      <StripeProvider>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage setLoggedUser={setLoggedUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Home loggedUser={loggedUser} searching={searching}/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/view/:id" element={<ProtectedRoute><View loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/education" element={<ProtectedRoute><DetailsEducation loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/experience" element={<ProtectedRoute><DetailsExperience loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/skills" element={<ProtectedRoute><DetailedSkills loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/company/:companyid/*" element={<ProtectedRoute><Company loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/network" element={<ProtectedRoute><NetworkPage /></ProtectedRoute>} />
        <Route path="/network/pending" element={<ProtectedRoute><PendingConnections loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/network/blocked" element={<ProtectedRoute><BlockedUsersList loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/network/following" element={<ProtectedRoute><FollowingList loggedUser={loggedUser} /></ProtectedRoute>} />
        



        <Route path="/jobtitle/:companyid" element={<ProtectedRoute><JobTitle loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/jobdetails/:companyid" element={<ProtectedRoute><JobDetailsForm loggedUser={loggedUser} /></ProtectedRoute>} />
      {/* // <Route path="/messages/requests" element={<ProtectedRoute><requestList loggedUser={loggedUser} /></ProtectedRoute>} /> */}
       


        <Route path="/employerjobtitle" element={<ProtectedRoute><EmployerJobTitle loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/employerjobdetails" element={<ProtectedRoute><EmployerJobDetailsForm loggedUser={loggedUser} /></ProtectedRoute>} />



        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/EmailManagement" element={
          <ProtectedRoute>
            <EmailManagement
            />
          </ProtectedRoute>
        } />
        <Route path="/UpdatePassword" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
        <Route path="/companyform" element={<ProtectedRoute><CreateCompanyForm loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/updatecompany/:companyid" element={<ProtectedRoute><EditCompanyForm /></ProtectedRoute>} />
        <Route path="/SearchResults" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
        <Route path="/ConnectionList" element={<ProtectedRoute><ConnectionsList /></ProtectedRoute>} />
        <Route path="/viewcompany/:companyid" element={<ProtectedRoute><ViewCompany loggedUser={loggedUser} /></ProtectedRoute>} />
        <Route path="/companyjobs" element={<ProtectedRoute><CompanyJobsTab /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>}>
  <Route index element={<ConversationList />} />
  <Route path="requests" element={<MessageRequests />} />  {/* This is critical */}
  <Route path=":conversationId" element={<ChatWindow />} />
</Route>
        <Route path="/jobs" element={<ProtectedRoute><JobHome /></ProtectedRoute>} />
        <Route path="/detailedjobs" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
       



        <Route path="/detailedjobs/:jobId" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
        <Route path="/myjobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
        <Route path="/mypostedjobs" element={<ProtectedRoute><MyPostedJobs/></ProtectedRoute>} />
       
        <Route
  path="/mypostedjobs/:jobid/applications"
  element={<ProtectedRoute><MyJobApplications /></ProtectedRoute>}
/>
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminjobs" element={<AdminJobsPage />} />
        <Route path="/adminjobs/FlaggedJobsPage" element={< FlaggedJobsPage />} />
        <Route path="/adminreport" element={<AdminReportsPage/>} />
        <Route path="/adminreport/most-reported" element={<AdminReportsPage />} />
        

<Route
  path="/company/:companyid/job/:jobid/applications"
  element={<ProtectedRoute><JobApplications /></ProtectedRoute>}
/>
<Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />



      </Routes>
      </StripeProvider>
    </div>
  );
}

export default App;
