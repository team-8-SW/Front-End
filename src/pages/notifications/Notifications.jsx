import React, { useState, useEffect } from 'react';
import { fetchNotifications, markNotificationAsRead } from '../../services/api';

const Notifications = ({ loggedUser }) => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications(token).then((data) => {
      setNotifications(data);
    });
  }, [token]);

  const handleCheckboxChange = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id)
        ? prev.filter((notificationId) => notificationId !== id)
        : [...prev, id]
    );
  };

  const handleMarkAsRead = async () => {
    try {
      for (const id of selectedNotifications) {
        await markNotificationAsRead(id);
      }
      setNotifications((prev) =>
        prev.map((notification) =>
          selectedNotifications.includes(notification.id)
            ? { ...notification, isRead: true }
            : notification
        )
      );
      setSelectedNotifications([]); // Clear selected notifications
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-8">
      <div className="w-4/5 mb-4">
        {selectedNotifications.length > 0 && (
          <button
            onClick={handleMarkAsRead}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Mark Selected as Read
          </button>
        )}
      </div>
      <div className="w-4/5">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center w-full p-6 mb-4 shadow-md rounded-lg border border-gray-200 ${
              notification.isRead ? 'bg-white' : 'bg-blue-100'
            }`}
          >
            <input
              type="checkbox"
              className="mr-4"
              checked={selectedNotifications.includes(notification.id)}
              onChange={() => handleCheckboxChange(notification.id)}
            />
            <div>
              <p className="text-gray-800 font-medium">{notification.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;