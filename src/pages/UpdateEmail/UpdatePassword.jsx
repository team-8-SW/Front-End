import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../services/api';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const response = await updatePassword(currentPassword, newPassword, token);
      navigate(-1);
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded">
      <div className="mb-6">
        <button onClick={handleBack} className="flex items-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
      </div>

      <div className="mb-2">
        <h2 className="text-xl font-bold">Password</h2>
        <p className="text-gray-600">Update your password</p>
      </div>

      <div className="relative mb-4">
        <input
          type={showCurrentPassword ? 'text' : 'password'}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button
          type="button"
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          className="absolute right-2 top-2 text-gray-600"
        >
          {showCurrentPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type={showNewPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute right-2 top-2 text-gray-600"
        >
          {showNewPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <button
        onClick={handleUpdatePassword}
        className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition"
      >
        Update password
      </button>
    </div>
  );
};

export default UpdatePassword;