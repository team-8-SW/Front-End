import React from 'react';
import { handleConnectionRequest } from '../../services/api';

const ConnectButton = ({ userId }) => {
  const handleClick = () => {
    handleConnectionRequest(userId)
      .then(response => {
        console.log('Connection successful:', response);
      })
      .catch(error => {
        console.error('Connection failed:', error);
      });
  };

  return (
    <button  className="border border-blue-500 rounded-full px-4 py-2 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition duration-300" onClick={handleClick}>
      Connect
    </button>
  );
};

export default ConnectButton;