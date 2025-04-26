import React, { useState } from 'react';
import MessagingTabs from './MessagingTabs';
import MessagingHeader from './MessagingHeader';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const currentUserId = "currentUser"; 

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col bg-white border rounded-md shadow-sm w-full max-w-5xl mx-auto lg:ml-12">
        <MessagingHeader/>
        <MessagingTabs />
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Conversation List - Left Side */}
          <div className="w-full md:w-1/3 border-r">
            <ConversationList 
              currentUserId={currentUserId}
              onSelect={setSelectedConversation}
            />
          </div>
          
          {/* Chat Window - Right Side */}
          <div className="w-full md:w-2/3">
            <ChatWindow 
              conversation={selectedConversation}
              currentUserId={currentUserId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;