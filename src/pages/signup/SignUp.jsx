import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm"

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full py-8">
      <SignUpForm />
      <footer className="w-full py-4 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-xs text-gray-500">
            <div className="flex justify-center flex-wrap gap-4 mb-2">
              <span>© 2025</span>
              <a href="#" className="hover:underline">User Agreement</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Community Guidelines</a>
            </div>
            <div className="flex justify-center flex-wrap gap-4">
              <a href="#" className="hover:underline">Cookie Policy</a>
              <a href="#" className="hover:underline">Copyright Policy</a>
              <a href="#" className="hover:underline">Send Feedback</a>
              <a href="#" className="hover:underline">Language</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;