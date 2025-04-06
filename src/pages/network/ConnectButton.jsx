import React, { useState } from 'react';
import { handleConnectionRequest } from '../../services/api';

const ConnectButton = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await handleConnectionRequest(userId);
      console.log('Connection successful:', response);
    } catch (error) {
      console.error('Connection failed:', error);
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="border border-blue-500 rounded-full px-4 py-2 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition duration-300"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Connecting...' : 'Connect'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ConnectButton;