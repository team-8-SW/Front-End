<<<<<<< HEAD
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import DetailsEducation from './pages/DetailedEducation/DetailsEducation';
import DetailsExperience from './pages/Detailedexperience/DetailsExperience';
import DetailedSkills from './pages/DetailedSkills/DetailedSkills';
import ExpForm from './pages/Detailedexperience/ExpForm';

function App() {
  const [loggedUser, setLoggedUser] = useState({
   
  });

  useEffect(() => {
    axios
      .get('http://localhost:3000/users/1') // ✅ Fixed URL formatting
      .then((res) => {
        setLoggedUser(res.data);
        console.log("User data fetched:", loggedUser); // ✅ Log fetched data
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []); // ✅ Runs once when the component mounts

  return (
    <div>
      <Nav />
      <div>
        <Routes>
          <Route path='/profile' element={<Profile loggedUser={loggedUser} />} />
          <Route path='/' element={<Home />} />
          <Route path='/education' element={<DetailsEducation  loggedUser={loggedUser}/>} />
          <Route path='/experience' element={<DetailsExperience />} />
          <Route path='/skills' element={<DetailedSkills loggedUser={loggedUser} />} />
          <Route path='/experienceform' element={<ExpForm />} />
=======
import { useState } from "react";
import "./App.css";
import { Button } from "@material-tailwind/react";
import Profile from "./pages/profile/Profile";

import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import DetailsEducation from "./pages/DetailedEducation/DetailsEducation";
import DetailsExperience from "./pages/Detailedexperience/DetailsExperience";
import DetailedSkills from "./pages/DetailedSkills/DetailedSkills";

function App() {
  return (
    <div className="bg-backGroundColor min-h-screen">
      <Nav />
      <div className="pt-4">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<DetailsEducation />} />
          <Route path="/experience" element={<DetailsExperience />} />
          <Route path="/skills" element={<DetailedSkills />} />
>>>>>>> 969a29295ffb1528b09404335f8c37614a70c1e8
        </Routes>
      </div>
    </div>
  );
}

export default App;
