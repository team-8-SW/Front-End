import axios from 'axios';
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { sendSignupEmail } from "../../services/api";
import SocialLogin from "../../components/SocialLogin";
import { Link } from "react-router-dom";
import { api } from '../../services/profile';

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      setMessage("Please complete the reCAPTCHA.");
      setMessageType("error");
      return;
    }

    try {
      const response = await api.post('/api/auth/registerwithcaptcha', {
        userName,
        email,
        password,
        firstName,
        lastName,
        recaptchaToken: recaptchaValue,
      });

      setMessage("Signup successful! A confirmation email has been sent.");
      setMessageType("success");
      setEmailSent(true);
      setResendTimer(30);
    } catch (error) {
      setMessage( "Failed to sign up. Please try again using another email or username.");
      setMessageType("error");
      console.log(error.response?.data?.message || "Failed to sign up. Please try again.");
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleResendEmail = () => {
    if (resendTimer === 0) {
      sendSignupEmail(email);
      setResendTimer(30);
    }
  };

  return (
    <div className="flex flex-col items-center w-full overflow-y-auto pb-6 relative">
      {/* LinkedIn logo positioned in upper left */}
      <div className="absolute top-4 left-8 md:left-16">
      <img
  src="\logos\LinkedIn-Logo.wine.svg" // ✅ Correct way
  alt="LinkedIn"
  width="84"
  height="21"
/>
      </div>
      
      <div className="mt-16 mb-6"></div>

      <h2 className="text-3xl font-normal text-center mb-4 text-gray-800">
        Make the most of your professional life
      </h2>

      <div className="bg-white shadow-md mx-auto max-w-md rounded-lg p-5 w-full sm:w-96">
        {message && (
          <p className={`text-center text-sm font-bold mb-4 ${messageType === "error" ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="firstName">First Name</label>
            <input
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="lastName">Last Name</label>
            <input
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="userName">Username</label>
            <input
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="email">Email</label>
            <input
              className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <input
                className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="absolute right-3 top-2 text-blue-600 font-semibold text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-600">
            By clicking Agree & Join or Continue, you agree to the LinkedIn 
            <a href="#" className="text-blue-600 hover:underline ml-1">User Agreement</a>, 
            <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>, and 
            <a href="#" className="text-blue-600 hover:underline ml-1">Cookie Policy</a>.
          </div>

          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-full"
            type="submit"
          >
            Agree & Join
          </button>

          {recaptchaValue === null && (
            <div className="flex justify-center">
              <ReCAPTCHA sitekey="6Lc-N_QqAAAAAB_NYGBo9DnTKTxSMJlPJ8RXFMy7" onChange={handleRecaptchaChange} />
            </div>
          )}

          {emailSent && (
            <button
              className={`mt-4 w-full ${resendTimer === 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"} text-white font-medium py-2 rounded-full`}
              onClick={handleResendEmail}
              disabled={resendTimer > 0}
              type="button"
            >
              Resend Confirmation Email {resendTimer > 0 ? `(${resendTimer}s)` : ""}
            </button>
          )}
        </form>

        <div className="flex items-center my-3">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Using the original SocialLogin component */}
        <div className="w-full py-3 px-10 rounded-full">
          <SocialLogin />
        </div>

        <div className="mt-3 text-center text-gray-600">
          Already on LinkedIn? <Link className="text-blue-600 hover:underline" to="/login">Sign in</Link>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        Looking to create a page for a business? <a href="#" className="text-blue-600 hover:underline">Get help</a>
      </div>
    </div>
  );
};

export default SignUpForm;