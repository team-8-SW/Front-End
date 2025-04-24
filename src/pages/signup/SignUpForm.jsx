import axios from 'axios';
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { sendSignupEmail } from "../../services/api";
import SocialLogin from "../../components/SocialLogin";
import { Link } from "react-router-dom";

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
      const response = await axios.post('http://localhost:5000/api/auth/registerwithcaptcha', {
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
      setMessage(error.response?.data?.message || "Failed to sign up. Please try again.");
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 21" width="84" height="21" className="fill-blue-600">
          <path d="M12.5 0h-9A3.5 3.5 0 0 0 0 3.5v9A3.5 3.5 0 0 0 3.5 16h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 12.5 0zM5 12H3V5h2v7zm-1-8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm8 8h-2V8.5c0-.8-.7-1.5-1.5-1.5S7 7.7 7 8.5V12H5V5h2v1.1c.4-.7 1.3-1.1 2-1.1a3 3 0 0 1 3 3v4zm16-3c0 2.2-1.8 4-4.1 4-2.1 0-3.9-1.8-3.9-4s1.8-4 4-4c2.2 0 4 1.8 4 4zm-6 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm9-3h2v7h-2V9zm2.5-2a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 33.5 7zM45 11.5V9h-2v2.5a.5.5 0 0 1-.5.5h-1v2h1c1.4 0 2.5-1.1 2.5-2.5zm-4-7.5h-2v9h6v-2h-4V4zm7 4c0-1.1.9-2 2-2h6V4h-6c-2.2 0-4 1.8-4 4s1.8 4 4 4h6v-2h-6c-1.1 0-2-.9-2-2zm11 2c-1.1 0-2-.9-2-2s.9-2 2-2h5V4h-5c-2.2 0-4 1.8-4 4s1.8 4 4 4h5v-2h-5zm7-4c0-1.1.9-2 2-2h6V4h-6c-2.2 0-4 1.8-4 4s1.8 4 4 4h6v-2h-6c-1.1 0-2-.9-2-2zm11-3c1.1 0 2 .9 2 2v1h-5c-1.1 0-2 .9-2 2s.9 2 2 2h3c.6 0 1-.4 1-1v-1h-3v-2h5v3c0 1.7-1.3 3-3 3h-3c-2.2 0-4-1.8-4-4s1.8-4 4-4h3z" />
        </svg>
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