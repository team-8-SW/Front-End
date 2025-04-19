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
      className="text-gray-600 font-semibold text-sm px-4 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50"
    >
      Ignore
    </button>
  );
};

export default DeclineConnection;
