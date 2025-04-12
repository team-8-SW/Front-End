// NewNotification.jsx
import React from 'react';

const NewNotification = ({ notification, onClose }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-3/4 bg-blue-500 text-white p-4 rounded-lg shadow-lg flex justify-between items-center z-50">
      <div>
        <p className="font-medium">{notification.message}</p>
        <p className="text-sm">{new Date(notification.timestamp).toLocaleString()}</p>
      </div>
      <button
        onClick={onClose}
        className="text-white font-bold text-xl bg-transparent border-none"
      >
        X
      </button>
    </div>
  );
};

export default NewNotification;
