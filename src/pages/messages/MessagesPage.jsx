import React, { useState } from 'react';
import MessagingTabs from './MessagingTabs';
import MessagingHeader from './MessagingHeader';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const currentUserId = "currentUser"; // Get from your auth system

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col bg-white border rounded-md shadow-sm max-w-5xl mx-auto ml-12 w-full">
        <MessagingHeader />
        <MessagingTabs />
        <div className="flex flex-1">
          {/* Conversation List - Left Side */}
          <div className="w-1/3 border-r">
            <ConversationList 
              currentUserId={currentUserId}
              onSelect={setSelectedConversation}
            />
          </div>
          
          {/* Chat Window - Right Side */}
          <ChatWindow 
            conversation={selectedConversation}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;