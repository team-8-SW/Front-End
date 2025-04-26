import React, { useState, useEffect } from 'react';
import socket from '../../services/socket';

const ConversationList = ({ currentUserId, onSelect }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unseenCount, setUnseenCount] = useState(0);

  useEffect(() => {
    if (!currentUserId) {
      console.error('No currentUserId provided to ConversationList');
      setError('User ID is missing. Please try again.');
      setLoading(false);
      return;
    }

    const handleConnect = () => {
      console.log('Socket connected for ConversationList, userId:', currentUserId);
      socket.emit('join_room', currentUserId);
      socket.emit('get_all_conversations', currentUserId);
      socket.emit('get_unseen_count', currentUserId);
    };

    const handleConversations = (data) => {
      console.log('Received conversations:', data);
      // Process the backend response format
      const processedConversations = Array.isArray(data) 
        ? data.map(conv => ({
            ...conv,
            participants: conv.participants.map(p => ({
              id: p.id,
              name: `${p.firstName} ${p.lastName}`,
              userName: p.user_name,
              // Add any other required participant fields
            })),
            unread: false // You might want to calculate this based on your backend
          }))
        : [];
      
      setConversations(processedConversations);
      setLoading(false);
    };

    const handleUnseenCount = (data) => {
      console.log('Received unseen count:', data);
      setUnseenCount(data.unreadCount || 0);
    };

    const handleNewMessage = (message) => {
      console.log('Received new message:', message);
      setConversations(prev => {
        const updated = prev.map(conv => {
          const isPartOfConversation = conv.participants.some(p => p.id === message.senderId);
          return isPartOfConversation
            ? {
                ...conv,
                lastMessage: message.content,
                timestamp: message.timestamp,
                unread: message.senderId !== currentUserId
              }
            : conv;
        });
        return updated;
      });
      socket.emit('get_unseen_count', currentUserId);
    };

    if (socket.connected) handleConnect();

    socket.on('connect', handleConnect);
    socket.on('all_conversations', handleConversations);
    socket.on('receive_message', handleNewMessage);
    socket.on('unseen_count', handleUnseenCount);
    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError('Failed to connect to messaging service. Please refresh.');
      setLoading(false);
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('all_conversations', handleConversations);
      socket.off('receive_message', handleNewMessage);
      socket.off('unseen_count', handleUnseenCount);
      socket.off('connect_error');
    };
  }, [currentUserId]);

  const handleSelectConversation = (conversation) => {
    const otherUser = conversation.participants?.find((p) => p.id !== currentUserId);
    if (!otherUser) return;

    console.log('Selecting conversation with:', otherUser.id);
    socket.emit('mark_as_read', {
      userId: currentUserId,
      otherUserId: otherUser.id,
    });

    socket.emit('get_conversation', {
      userId: currentUserId,
      otherUserId: otherUser.id,
    });

    socket.once('conversation_history', (history) => {
      console.log('Received conversation history:', history);
      if (onSelect && typeof onSelect === 'function') {
        onSelect({
          ...conversation,
          messages: Array.isArray(history) ? history : [],
        });
      }
    });

    socket.emit('get_unseen_count', currentUserId);
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3 animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="mb-6">
          <img src="/placeholder-messages.png" alt="No conversations" className="w-32 mx-auto" />
        </div>
        <h2 className="text-xl font-medium mb-2">No conversations yet</h2>
        <p className="text-gray-600">Start a new conversation to begin messaging</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto divide-y">
      {conversations.map((conversation) => {
        const otherUser = conversation.participants?.find((p) => p.id !== currentUserId) || {};
        const lastMessageTime = conversation.timestamp
          ? new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : '';

        return (
          <div
            key={conversation.id}
            onClick={() => handleSelectConversation(conversation)}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
              conversation.unread ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 min-w-0">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
                  {otherUser.avatarUrl ? (
                    <img
                      src={otherUser.avatarUrl}
                      alt={otherUser.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/default-avatar.png';
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <span className="text-gray-600 font-medium">
                        {otherUser.userName ? otherUser.userName.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">
                    {otherUser.name || otherUser.userName || 'Unknown User'}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.lastMessage || 'No messages yet'}
                  </p>
                </div>
              </div>
              <div className="ml-4 flex flex-col items-end">
                <span className="text-xs text-gray-500 whitespace-nowrap">{lastMessageTime}</span>
                {conversation.unread && (
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;