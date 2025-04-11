import React from 'react';
import { acceptConnection } from '../../services/api';

const AcceptConnection = ({ userId, onSuccess }) => {
    const handleAccept = async () => {
        try {
            const response = await acceptConnection(userId);
            if (response) {
                onSuccess(userId); 
            }
        } catch (error) {
            console.error('Error accepting connection:', error);
        }
    };

    return (
        <button
            onClick={handleAccept}
            className="bg-white text-blue px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
        >
            Accept
        </button>
    );
};

export default AcceptConnection;