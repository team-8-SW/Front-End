import React from 'react'
import MessagingTabs from './MessagingTabs';
import MessagingHeader from './MessagingHeader';
import ChatWindow from './ChatWindow';

const MessagesPage = () => {
  return (
    <div className="flex min-h-screen ">
     <div className="flex flex-col bg-white border rounded-md shadow-sm max-w-5xl mx-auto ml-12">
        <MessagingHeader/>
        <MessagingTabs />
        <div className="flex">
          {/* Left side - Empty messages or message list */}
          <div className="w-1/3 border-r">
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="mb-6">
                <img src="/api/placeholder/200/160" alt="No messages" />
              </div>
              <h2 className="text-xl font-medium mb-2">No messages yet</h2>
              <p className="text-gray-600 mb-6">Reach out and start a conversation to advance your career</p>
              <button className="px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-50">
                Send a message
              </button>
            </div>
          </div>
        <ChatWindow />
     </div>
   </div>
   </div>
  )
}
export default MessagesPage;