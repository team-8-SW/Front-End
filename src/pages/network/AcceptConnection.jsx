import React from 'react';
import { acceptConnection } from '../../services/api';

const AcceptConnection = ({ userId, onSuccess }) => {
    const handleAccept = async () => {
        try {
            const connection = await acceptConnection(userId);
            if (connection?.status === "accepted") {
                onSuccess(userId); 
            } else {
                console.warn('Connection not accepted:', connection);
            }
        } catch (error) {
            console.error('Error accepting connection:', error);
        }
    };

    return (
        <button
            onClick={handleAccept}
            className="text-blue-600 font-semibold text-sm px-4 py-1.5 rounded-full border border-blue-600 hover:bg-blue-50"
        >
            Accept
        </button>
    );
};

export default AcceptConnection;
