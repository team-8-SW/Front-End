import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const SocialLogin = () => {
  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);

    
    const { credential } = credentialResponse; 

    
    localStorage.setItem("google_token", credential);

    console.log("Stored Google Token:", credential);
  };

  const handleLoginError = () => {
    console.log("Google Login Failed");
  };

  return (
    <GoogleLogin
      clientId="http://93470150540-lbg03r6jfctm48l3nn6p5flmhniru635.apps.googleusercontent.com"
      onSuccess={handleLoginSuccess}
      onError={handleLoginError}
    />
  );
};

export default SocialLogin;