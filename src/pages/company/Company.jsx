import React from "react";
import { Routes, Route } from "react-router-dom";
import Leftside from "./Leftside";
import CompanyPosts from "./CompanyPosts";

const Company = ({ loggedUser }) => {
  return (
    <div className="flex justify-center items-start gap-5 w-full">
      
      {/* Sidebar */}
      <div className="w-[20%] h-screen">
        <Leftside loggedUser={loggedUser} />
      </div>

      {/* Main Content */}
      <div className="w-[80%] p-5">
        <Routes>
          {/* REMOVE leading slash (nested routes must be relative) */}
          <Route path="companyposts" element={<CompanyPosts loggedUser={loggedUser} />} />
        </Routes>
      </div>

    </div>
  );
};

export default Company;
