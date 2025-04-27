import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import MessagingHeader from './MessagingHeader';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';
import RequestList from './RequestList'; // You'll need to create this component

const MessagingTabs = () => {
  return (
    <div className="flex border-b">
      <NavLink
        to="/messages"
        end
        className={({ isActive }) => 
          `flex-1 py-3 text-center font-medium ${
            isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`
        }
      >
        Messages
      </NavLink>
      <NavLink
        to="/messages/requests"
        className={({ isActive }) => 
          `flex-1 py-3 text-center font-medium ${
            isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
          }`
        }
      >
        Requests
      </NavLink>
    </div>
  );
};

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUserId(payload.id);
    } catch (error) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  if (!currentUserId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-6 bg-white rounded shadow">
          <p className="text-red-500 mb-4">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col bg-white border rounded-md shadow-sm w-full max-w-5xl mx-auto lg:ml-12">
        <MessagingHeader/>
        <MessagingTabs />
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Left sidebar - shows for both tabs */}
          <div className="w-full md:w-1/3 border-r">
            {window.location.pathname.includes('/requests') ? (
              <RequestList currentUserId={currentUserId} />
            ) : (
              <ConversationList 
                currentUserId={currentUserId}
                onSelect={setSelectedConversation}
              />
            )}
          </div>
          
          {/* Right content area */}
          <div className="w-full md:w-2/3">
            {window.location.pathname.includes('/requests') ? (
              <div className="p-4">
                {/* <h2 className="text-xl font-bold mb-4">Message Requests</h2> */}
                {/* Request details will be shown here */}
                <Outlet /> {/* For nested request routes if needed */}
              </div>
            ) : (
              <ChatWindow 
                conversation={selectedConversation}
                currentUserId={currentUserId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;