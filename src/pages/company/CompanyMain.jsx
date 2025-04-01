import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import CompanyPosts from './CompanyPosts';
import { useState } from 'react';

const CompanyMain = ({loggedUser}) => {
  return (
    <div>
        <Routes>
            <Route path="/companyposts" element={<CompanyPosts  />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/companyposts" element={<CompanyPosts loggedUser={loggedUser} />} />
        </Routes>
        
    </div>
  )
}

export default CompanyMain