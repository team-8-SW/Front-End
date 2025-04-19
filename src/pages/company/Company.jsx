import React, { use } from "react";
import { Routes, Route } from "react-router-dom";
import Leftside from "./Leftside";
import CompanyPosts from "./CompanyPosts";
import Dashboard from "./Dashboard";
import Jobs from "./Jobs";
import RightSide from "./RightSide";
import Nav from "../../components/Nav";
import AnalyticsPage from "./AnalyticsPage";
import CompanyCreatePost from "./CompanyCreatePost";
import ViewCompany from "./ViewCompany";
import EditCompanyForm from "./EditCompanyPage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const Company = ({ loggedUser }) => {
  const {companyid}=useParams()
  const [companyData, setCompanyData] = useState("");
  
  console.log("Company ID in Company:", companyid); // ✅ Log loggedUser
  useEffect(() => {
    const fetchLatestCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/company/${companyid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const companies = res.data;
        
        
          // Get the last created company (optionally sort if backend doesn’t return ordered)
          
          setCompanyData(companies);
          console.log("Latest company data in createpost:", companies);
        
      } catch (err) {
        console.error("Failed to fetch company:", err);
      }
    };

    fetchLatestCompany();
  }, []);

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
 
          <Route path="companyposts"element={<div className="space-y-6">
             <CompanyCreatePost companyid={companyid} companyName={companyData.name}companyLogo={companyData.logo_url} />
              <CompanyPosts companyid={companyid} />
    </div>
  }
/>


          <Route path="dashboard" element={<Dashboard />} />
          <Route path="job" element={<Jobs loggedUser={loggedUser}/>} />
          <Route path="analytics" element={<AnalyticsPage loggedUser={loggedUser} />} />
          <Route path="viewcompany" element={<ViewCompany loggedUser={loggedUser} />} />
          <Route path="updatecompany" element={<EditCompanyForm loggedUser={loggedUser} />} />

      
          
          
          

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










