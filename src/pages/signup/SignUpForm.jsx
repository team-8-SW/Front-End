import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { sendSignupEmail } from "../../services/api";
import SocialLogin from "../../components/SocialLogin";
import { Link } from "react-router-dom";

import { GoogleLogin } from '@react-oauth/google';

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      setRecaptchaError(true);
      return;
    }
    
    setRecaptchaError(false);

    try {
      await sendSignupEmail(email);
      setEmailSent(true);
      setResendTimer(30);
      startResendTimer();
    } catch (error) {
      console.error(error);
      alert("Failed to send signup email. Please try again.");
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    setRecaptchaError(false);
  };

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
         <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
          Make the most of your professional life
        </h2>
      <div className="bg-white shadow-lg rounded-lg px-8 pt-8 pb-10 w-full max-w-md border border-gray-200 w-full md:max-w-lg"> 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-300" type="submit">
            Agree & Join
          </button>
        </form>

        <div className="mt-4 flex justify-center">
          <ReCAPTCHA sitekey="6Lc-N_QqAAAAAB_NYGBo9DnTKTxSMJlPJ8RXFMy7" onChange={handleRecaptchaChange} />
        </div>
        {recaptchaError && <p className="text-red-500 text-sm mt-2 text-center">Please complete the reCAPTCHA.</p>}

        {emailSent && (
          <div className="mt-4 text-green-600 text-center">
            Email sent successfully!
          </div>
        )}

        {emailSent && (
          <button
            className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition duration-300 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={resendTimer > 0}
          >
            {resendTimer > 0 ? `Resend Email in ${resendTimer}s` : "Resend Email"}
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
      </div>

      <div className="mt-6 text-gray-600">
        Already on LinkedIn?{" "}
        <Link className="text-blue-600 hover:underline" to="/login">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
