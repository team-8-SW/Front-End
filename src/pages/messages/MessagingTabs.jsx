import React, { useState } from 'react';
import NewMessageWindow from './NewMessageWindow';

const MessagingTabs = () => {
  const [activeTab, setActiveTab] = useState('Focused');
  const tabs = ['Focused', 'Jobs', 'Unread', 'My Connections', 'InMail', 'Starred'];

  // Dummy handler to avoid error
  const handleNewMessage = () => {
    console.log('New message button clicked');
  };

  return (
    <div className="flex flex-col border-b">
      <div className="flex overflow-x-auto p-2 space-x-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeTab === tab ? 'bg-green-800 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conversations Header and New Message Button */}
     
      </div>
  
  );
};

export default MessagingTabs;
