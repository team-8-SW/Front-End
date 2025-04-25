import React, { useState, useEffect } from 'react';
import MessagingTabs from './MessagingTabs';
import MessagingHeader from './MessagingHeader';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';
import { io } from 'socket.io-client';

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [socket, setSocket] = useState(null);
  const currentUserId = "currentUser"; // Replace with actual user ID from auth

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io('http://your-backend-url.com', {
      auth: {
        token: localStorage.getItem('jwtToken')
      }
    });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Join the user's room
    socket.emit('join_room', { userId: currentUserId });

    // Request conversations when connected
    socket.on('connect', () => {
      socket.emit('get_all_conversations', { userId: currentUserId });
    });

    // Handle incoming conversations
    socket.on('all_conversations', (data) => {
      setConversations(data.conversations);
    });

    // Handle conversation updates
    socket.on('conversation_update', (updatedConversation) => {
      setConversations(prev => prev.map(conv => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      ));
    });

    return () => {
      socket.off('connect');
      socket.off('all_conversations');
      socket.off('conversation_update');
    };
  }, [socket, currentUserId]);

  const markMessagesAsRead = (conversationId) => {
    if (socket) {
      socket.emit('mark_as_read', {
        conversationId,
        userId: currentUserId
      });
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    markMessagesAsRead(conversation.id);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col bg-white border rounded-md shadow-sm max-w-5xl mx-auto ml-12 w-full">
        <MessagingHeader />
        <MessagingTabs />
        <div className="flex flex-1">
          {/* Left side - Conversation list */}
          <div className="w-1/3 border-r">
            {conversations.length > 0 ? (
              <ConversationList
                conversations={conversations}
                onSelect={handleSelectConversation}
                selectedId={selectedConversation?.id}
                currentUserId={currentUserId}
              />
            ) : (
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
            )}
          </div>
          
          {/* Right side - Chat window */}
          <div className="flex-1">
            {selectedConversation ? (
              <ChatWindow 
                conversation={selectedConversation} 
                currentUserId={currentUserId}
                socket={socket}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a chat from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;