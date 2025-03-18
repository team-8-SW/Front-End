import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import DetailsEducation from './pages/DetailedEducation/DetailsEducation';
import DetailsExperience from './pages/Detailedexperience/DetailsExperience';
import DetailedSkills from './pages/DetailedSkills/DetailedSkills';



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
          <Route path='/' element={<Home  loggedUser={loggedUser}/>} />
          <Route path='/education' element={<DetailsEducation  loggedUser={loggedUser}/>} />
          <Route path='/experience' element={<DetailsExperience loggedUser={loggedUser}/>} />
          <Route path='/skills' element={<DetailedSkills loggedUser={loggedUser} />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
