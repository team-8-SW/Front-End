import axios from 'axios';
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { sendSignupEmail } from "../../services/api";
import SocialLogin from "../../components/SocialLogin";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-xl pt-6 pr-4 pb-6 pl-4 font-semibold text-center mb-6 text-gray-800 font-medium">
        Make the most of your professional life
      </h2>

      <div className="bg-white shadow-lg mx-auto max-w-[400px] rounded-lg px-9 pt-8 pb-5 w-full border-gray-200">
        {message && (
          <p className={`text-center text-sm font-bold mb-4 ${messageType === "error" ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">Username</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg" type="submit">
            Agree & Join
          </button>
        </form>

        <div className="mt-4 flex justify-center">
          <ReCAPTCHA sitekey="6Lc-N_QqAAAAAB_NYGBo9DnTKTxSMJlPJ8RXFMy7" onChange={handleRecaptchaChange} />
        </div>

        {emailSent && (
          <button
            className={`mt-4 w-full ${resendTimer === 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500"} text-white font-medium py-2 rounded-lg`}
            onClick={handleResendEmail}
            disabled={resendTimer > 0}>
            Resend Confirmation Email {resendTimer > 0 ? `(${resendTimer}s)` : ""}
          </button>
        )}

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className="w-full">
          <SocialLogin />
        </button>

        <div className="mt-6 text-gray-600 items-center">
        Already on LinkedIn? <Link className="text-blue-600 hover:underline" to="/login">Sign in</Link>
      </div>
      </div>

    </div>
  );
};

export default SignUpForm;
