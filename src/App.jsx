import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Nav from './components/Nav';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import DetailsEducation from './pages/DetailedEducation/DetailsEducation';
import DetailsExperience from './pages/Detailedexperience/DetailsExperience';
import DetailedSkills from './pages/DetailedSkills/DetailedSkills';
import LoginPage from "./pages/login/LoginPage";
import SignUp from "./pages/signup/SignUp";

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
          <Route path='/profile' element={<Profile loggedUser={loggedUser} />} />
          <Route path='/' element={<Home />} />
          <Route path='/education' element={<DetailsEducation  loggedUser={loggedUser}/>} />
          <Route path='/experience' element={<DetailsExperience loggedUser={loggedUser} />} />
          <Route path='/skills' element={<DetailedSkills loggedUser={loggedUser} />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
