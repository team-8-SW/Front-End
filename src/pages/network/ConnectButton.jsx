import React, { useState } from 'react';
import { handleConnectionRequest } from '../../services/api';

const ConnectButton = ({ userId,token }) => {
  const [isPending, setIsPending] = useState(false);
  const [isConnected, setIsConnected] = useState(false); 
  const [error, setError] = useState(null);
  

  const handleClick = async () => {
    setError(null);
    try {
      await handleConnectionRequest(userId, token);
      setIsPending(true); 
      setIsConnected(true); 
    } catch (error) {
      console.error('Connection failed:', error);
      /*setError('Connection failed. Please try again.');*/
    }
  };

  return (
    <div className="min-w-[110px]">
      {!isConnected && ( 
        <button
          className="w-[120px] border border-blue-500 rounded-full px-4 py-2 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition duration-300 text-sm"
          onClick={() => { handleClick(); window.location.reload(); }}
          disabled={isPending} 
        >
          {isPending ? 'Pending' : 'Connect'}
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ConnectButton;