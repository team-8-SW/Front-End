import axios from 'axios';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from '../../components/SocialLogin';
import { api } from '../../services/profile';

const LoginForm = ({ setLoggedUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password
      });

      const token = response.data.token;
      localStorage.setItem("token", token); 
      setMessage("Login successful!");
      setMessageType("success");

      if (setLoggedUser) {
        setLoggedUser(response.data.user);
      }

      setTimeout(() => {
        navigate("/"); 
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="w-full max-w-md">
      {message && (
        <p className={`text-center text-sm font-bold mb-4 ${messageType === "error" ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}

      {/* Your Social Login Component */}
      <div className="mb-6">
        <div className="flex flex-col items-center justify-center w-full">
          < SocialLogin />
        </div>
      </div>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded w-full py-3 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="border border-gray-300 rounded w-full py-3 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <Link to="/forgot-password" className="block text-blue-600 hover:underline mb-4">
          Forgot password?
        </Link>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-full"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;