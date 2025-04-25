import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ConversationList = ({ currentUserId, onSelect }) => {
  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem('jwtToken') // Send JWT for authentication
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

    // Handle new messages that update conversations
    socket.on('new_message', (message) => {
      setConversations(prev => updateConversations(prev, message));
    });

    return () => {
      socket.off('connect');
      socket.off('all_conversations');
      socket.off('new_message');
    };
  }, [socket, currentUserId]);

  const updateConversations = (conversations, message) => {
    return conversations.map(conv => {
      if (conv.id === message.conversationId) {
        return {
          ...conv,
          lastMessage: message.text,
          timestamp: message.timestamp,
          unread: message.senderId !== currentUserId
        };
      }
      return conv;
    });
  };

  const handleConversationSelect = (conversation) => {
    // Mark as read when selected
    socket.emit('mark_as_read', {
      conversationId: conversation.id,
      userId: currentUserId
    });
    onSelect(conversation);
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      {conversations.map((conversation) => {
        const otherParticipant = conversation.participants.find(
          p => p.id !== currentUserId
        );

        return (
          <div
            key={conversation.id}
            onClick={() => handleConversationSelect(conversation)}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
              conversation.unread ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                {otherParticipant.avatarUrl ? (
                  <img 
                    src={otherParticipant.avatarUrl} 
                    alt={otherParticipant.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-sm">
                    {otherParticipant.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-medium truncate">{otherParticipant.name}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(conversation.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread && (
                <div className="ml-2 w-2 h-2 rounded-full bg-blue-500"></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;