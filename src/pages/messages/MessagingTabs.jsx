import React from 'react';
import { useState } from 'react';

const MessagingTabs = () => {
  const [activeTab, setActiveTab] = useState('Focused');
  const tabs = ['Focused', 'Jobs', 'Unread', 'My Connections', 'InMail', 'Starred'];
  return (
  <div className="flex overflow-x-auto border-b">
    <div className="flex p-2 space-x-1">
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
  </div>
); };

export default MessagingTabs;
