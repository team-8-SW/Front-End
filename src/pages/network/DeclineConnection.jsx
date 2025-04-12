import React from 'react';
import { declineConnection } from '../../services/api';

const DeclineConnection = ({ userId, onSuccess }) => {
    const handleDecline = async () => {
        try {
            const response = await declineConnection(userId);
            if (response) {
                onSuccess(userId); 
            }
        } catch (error) {
            console.error('Error declining connection:', error);
        }
    };

    return (
        <button
            onClick={handleDecline}
            className="bg-white text-grey px-4 py-2 rounded hover:bg-grey-600 focus:outline-none"
        >
            Decline
        </button>
    );
};

export default DeclineConnection;