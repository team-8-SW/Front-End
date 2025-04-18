import React from 'react';
import { declineConnection } from '../../services/api';

const DeclineConnection = ({ userId, onSuccess }) => {
  const handleDecline = async () => {
    try {
      const connection = await declineConnection(userId);
      if (connection?.status === 'declined' || connection) {
        onSuccess(userId); 
      } else {
        console.warn('Connection not declined:', connection);
      }
    } catch (error) {
      console.error('Error declining connection:', error);
    }
  };

  return (
    <button
      onClick={handleDecline}
      className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none"
    >
      Decline
    </button>
  );
};

export default DeclineConnection;
