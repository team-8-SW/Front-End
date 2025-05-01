import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewMessageWindow from './NewMessageWindow';
import { MdOutlineError } from 'react-icons/md';

const MessagingTabs = () => {
  const [activeTab, setActiveTab] = useState('Focused');
  const [showNewMessageWindow, setShowNewMessageWindow] = useState(false);
  const navigate = useNavigate();
  
  const tabs = ['Focused', 'Jobs', 'Unread', 'My Connections', 'InMail', 'Starred'];

  const handleNewMessage = () => {
    setShowNewMessageWindow(true);
  };

  const handleCloseNewMessage = () => {
    setShowNewMessageWindow(false);
  };

  const handleRequestsClick = () => {
    navigate('/messages/requests');
  };

  return (
    <div className="flex flex-col border-b">
      {/* Top section with tabs and requests button */}
      <div className="flex items-center justify-between border-b">
        <div className="flex overflow-x-auto p-2 space-x-1 flex-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
                activeTab === tab 
                  ? 'bg-green-800 text-white font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Requests button on the right */}
        <button
        onClick={handleRequestsClick}
        className="px-4 py-2 text-gray-600 hover:text-gray-800 whitespace-nowrap mr-2 text-sm font-medium"
      >
          Requests
        </button>
      </div>
    

      {/* Conversations header and new message button */}
      
    </div>
  );
};

export default MessagingTabs;