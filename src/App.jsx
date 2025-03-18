import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@material-tailwind/react";
import Profile from './pages/profile/Profile';

import Nav from './components/Nav';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import ResetPassword from "./pages/login/ResetPassword";

function App() {
  

  return (
    <div >
      <Nav/>
      <div className=''>
  <Routes>
<Route path='/profile' element={<Profile/>} />
<Route path='/' element={<Home/>} />
<Route path="/login" element={<Login />} />;
<Route path="/reset-password" element={<ResetPassword />} />
      
</Routes>
</div>
      
    </div>
  )
}

export default App
