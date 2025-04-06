import React, { useState, useEffect } from 'react';
import { fetchNotifications, markNotificationAsRead } from '../../services/api';

const Notifications = ({ loggedUser }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications(loggedUser.id).then((data) => {
      setNotifications(data);
    });
  }, [loggedUser.id]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-8">
      
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="w-full p-6 mb-4 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <p className="text-gray-800 font-medium">{notification.message}</p>
            <p className="text-sm text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>

  );
};

export default Notifications;