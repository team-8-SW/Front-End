// LoginPage.jsx
import React from 'react';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = ({ setLoggedUser }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header with LinkedIn logo on upper left */}
      <header className="w-full py-4 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex-shrink-0">
          <img
  src="\logos\LinkedIn-Logo.wine.svg" // ✅ Correct way
  alt="LinkedIn"
  width="84"
  height="21"
/>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg px-6 pt-8 pb-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Sign in
          </h2>
          
          <LoginForm setLoggedUser={setLoggedUser} />
          
          <div className="mt-6 text-center">
            <span className="text-gray-600">New to LinkedIn?</span>{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Join now
            </Link>
          </div>
        </div>
      </main>

      {/* Footer - extended full width */}
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

export default LoginPage;