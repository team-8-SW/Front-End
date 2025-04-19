import axios from 'axios';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      const token = response.data.token;
      localStorage.setItem("token", token); // Store token in localStorage
      setMessage("Login successful!");
      setMessageType("success");

      setTimeout(() => {
        navigate("/"); // change if your dashboard route is different
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
        Welcome back to Career Hub
      </h2>

      <div className="bg-white shadow-lg rounded-lg px-8 pt-8 pb-10 w-full max-w-md border border-gray-200">
        {message && (
          <p className={`text-center text-sm font-bold mb-4 ${messageType === "error" ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mb-3"
          >
            Sign In
          </button>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </form>
      </div>
      <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Join now
          </Link>
        </div>
    </div>
  );
};

export default LoginForm;
