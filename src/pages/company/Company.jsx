import React from "react";
import { Routes, Route } from "react-router-dom";
import Leftside from "./Leftside";
import CompanyPosts from "./CompanyPosts";
import Dashboard from "./Dashboard";
import Jobs from "./Jobs";
import RightSide from "./RightSide";
import Nav from "../../components/Nav";
import AnalyticsPage from "./AnalyticsPage";
import CompanyCreatePost from "./CompanyCreatePost";


const Company = ({ loggedUser }) => {
  return (
    <div>
{/* <Nav/> */}
    
    <div className="flex justify-center items-start gap-5 w-full">
      
      {/* Sidebar */}
      <div className="w-[20%] h-screen">
        <Leftside loggedUser={loggedUser} />
      </div>

      {/* Main Content */}
      <div className="w-[60%] p-5">
        <Routes>

          {/* REMOVE leading slash (nested routes must be relative) */}
          <Route path="companyposts" element={<CompanyPosts loggedUser={loggedUser} />} />
          <Route path="companyposts"element={<div className="space-y-6">
             <CompanyCreatePost companyId={loggedUser?.id} companyName={loggedUser?.company?.name}companyLogo={loggedUser?.company?.logo} />
              <CompanyPosts companyId={loggedUser?.id} />
    </div>
  }
/>


          <Route path="dashboard" element={<Dashboard />} />
          <Route path="job" element={<Jobs loggedUser={loggedUser}/>} />
          <Route path="analytics" element={<AnalyticsPage loggedUser={loggedUser} />} />
          

        </Routes>
      </div>
        
        {/* Right Side */}
        {/* <div className="w-[20%] ">
        <RightSide loggedUser={loggedUser} />
        </div> */}
    
        

    </div>
    </div>
  );
};

export default Company;










