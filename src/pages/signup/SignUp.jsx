import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm"

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full py-8">
      <SignUpForm />
    </div>
  );
};

export default SignUp;