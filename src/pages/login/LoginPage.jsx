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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 21" fill="#0A66C2" width="84" height="21">
              <g>
                <path d="M12.5 2.7H2.1C1.3 2.7 0.7 3.3 0.7 4.1V14.5C0.7 15.3 1.3 15.9 2.1 15.9H12.5C13.3 15.9 13.9 15.3 13.9 14.5V4.1C13.9 3.3 13.3 2.7 12.5 2.7ZM4.7 14H2.4V7H4.7V14ZM3.6 6C2.8 6 2.2 5.4 2.2 4.6C2.2 3.8 2.8 3.2 3.6 3.2C4.4 3.2 5 3.8 5 4.6C5 5.4 4.4 6 3.6 6ZM12.2 14H9.9V10.4C9.9 9.6 9.9 8.6 8.8 8.6C7.7 8.6 7.5 9.5 7.5 10.4V14H5.2V7H7.4V8C7.7 7.4 8.5 6.8 9.7 6.8C12 6.8 12.2 8.2 12.2 10V14Z"></path>
                <path d="M42.3 6H39.2V14H42.3V9.9C42.3 8.7 42.5 7.5 44 7.5C45.5 7.5 45.5 8.9 45.5 10V14H48.6V9.3C48.6 6.7 48 5.8 45.7 5.8C44.6 5.8 43.7 6.2 43.3 7H43.2V6H42.3Z"></path>
                <path d="M26.9 6H30V14H26.9V6Z"></path>
                <path d="M28.5 2.7C27.5 2.7 26.6 3.6 26.6 4.6C26.6 5.6 27.5 6.5 28.5 6.5C29.5 6.5 30.4 5.6 30.4 4.6C30.4 3.6 29.5 2.7 28.5 2.7Z"></path>
                <path d="M54.5 8.7H52.7V6H50.6V8.7H49.3V10.6H50.6V14H52.7V10.6H54.5V8.7Z"></path>
                <path d="M63.3 9.8C63.1 8.5 62.1 5.8 58.9 5.8C55.7 5.8 54.5 8.5 54.5 10C54.5 11.5 55.7 14.2 58.9 14.2C62.1 14.2 63.1 11.5 63.3 10.2H61.2C61 10.9 60.5 12.3 58.9 12.3C57.3 12.3 56.7 10.9 56.7 10C56.7 9.1 57.3 7.7 58.9 7.7C60.5 7.7 61 9.1 61.2 9.8H63.3Z"></path>
                <path d="M37.2 5.8C34 5.8 32.8 8.5 32.8 10C32.8 11.5 34 14.2 37.2 14.2C40.4 14.2 41.7 11.5 41.7 10C41.7 8.5 40.4 5.8 37.2 5.8ZM37.2 12.3C35.6 12.3 34.9 10.9 34.9 10C34.9 9.1 35.6 7.7 37.2 7.7C38.8 7.7 39.5 9.1 39.5 10C39.5 10.9 38.8 12.3 37.2 12.3Z"></path>
                <path d="M77.8 6H74.7V14H77.8V9.9C77.8 8.7 78 7.5 79.5 7.5C81 7.5 81 8.9 81 10V14H84.1V9.3C84.1 6.7 83.5 5.8 81.2 5.8C80.1 5.8 79.2 6.2 78.8 7H78.7V6H77.8Z"></path>
                <path d="M71.2 6H74.3V14H71.2V6Z"></path>
                <path d="M72.8 2.7C71.8 2.7 70.9 3.6 70.9 4.6C70.9 5.6 71.8 6.5 72.8 6.5C73.8 6.5 74.7 5.6 74.7 4.6C74.7 3.6 73.8 2.7 72.8 2.7Z"></path>
                <path d="M69.8 8.4C69.5 7.9 69.2 7.1 67.8 7.1C66.4 7.1 65.3 8.4 65.3 10C65.3 11.6 66.4 12.9 67.8 12.9C69.2 12.9 69.5 12.1 69.8 11.6H69.9V12.7C69.9 13.6 69.3 14.2 68 14.2C66.7 14.2 66.4 13.4 66.2 12.9H64C64.4 14.5 65.5 16 67.9 16C70.3 16 72 14.7 72 12.2V6H69.9V8.4H69.8ZM68.1 11C66.8 11 66.5 10.1 66.5 10C66.5 9.9 66.8 9 68.1 9C69.4 9 69.7 9.9 69.7 10C69.7 10.1 69.4 11 68.1 11Z"></path>
                <path d="M20.6 7.3C19.9 6.4 19 6 17.9 6C15.6 6 13.9 7.9 13.9 10C13.9 12.1 15.6 14 17.9 14C19 14 19.9 13.6 20.6 12.7H20.7V13.8H23.8V6H20.7V7.3H20.6ZM18.6 11.8C17.2 11.8 16.3 11 16.3 10C16.3 9 17.2 8.2 18.6 8.2C20 8.2 20.9 9 20.9 10C20.9 11 20 11.8 18.6 11.8Z"></path>
              </g>
            </svg>
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