import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@material-tailwind/react";

import Nav from './components/Nav'; 
import LoginPage from './pages/login/LoginPage';
import SignUp from './pages/signup/SignUp';
import { GoogleLogin } from '@react-oauth/google';
import SocialLogin from './components/SocialLogin';
function App() {
  

  return (
    <div>
      <div className='w-full'>  <Nav /></div>
       
    <div> <LoginPage/> </div>

    </div>
  )
}

export default App
