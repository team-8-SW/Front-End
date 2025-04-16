import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../services/api";

const SocialLogin = ({ setLoggedUser  }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse; 

    console.log("Google Login Success:", credential);

    const response = await googleLogin(credential);

    if (response.token) {
      localStorage.setItem("token", response.token); 
      /*localStorage.setItem("userId", response.user.id);*/
      setLoggedUser (response.user); 
      navigate("/");
    } else {
      console.error("Login failed:", response.error);
    }
  };

  const handleLoginError = () => {
    console.log("Google Login Failed");
  };

  return (
    <GoogleLogin
      clientId="93470150540-lbg03r6jfctm48l3nn6p5flmhniru635.apps.googleusercontent.com"
      onSuccess={handleLoginSuccess}
      onError={handleLoginError}
    />
  );
};

export default SocialLogin;