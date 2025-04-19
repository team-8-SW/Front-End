import React, { useState } from 'react';
import { blockUser, unblockUser } from '../../services/api';

const UserActionButtons = ({ userId, initialIsBlocked }) => {
  const [isBlocked, setIsBlocked] = useState(initialIsBlocked);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleBlockAction = async () => {
    if (!token) {
      alert('Please login to perform this action');
      return;
    }
    
    setIsLoading(true);
    try {
      if (isBlocked) {
        // Unblock user
        await unblockUser(userId, token);
        setIsBlocked(false);
        alert('User unblocked successfully');
      } else {
        // Block user
        await blockUser(userId, token);
        setIsBlocked(true);
        alert('User blocked successfully');
      }
    } catch (error) {
      console.error('Block/Unblock error:', error);
      alert(error.response?.data?.message || 
           `Failed to ${isBlocked ? 'unblock' : 'block'} user. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBlockAction}
      disabled={isLoading}
      className={`px-4 py-2 rounded-full font-medium text-sm ${
        isBlocked
          ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          : 'bg-red-100 text-red-600 hover:bg-red-200'
      }`}
    >
      {isLoading ? 'Processing...' : isBlocked ? 'Unblock' : 'Block'}
    </button>
  );
};

export default UserActionButtons;