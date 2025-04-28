import React, { useState, useEffect } from 'react';
import socket from '../../services/socket';
import { PencilIcon } from '@heroicons/react/24/outline'; // Tailwind Heroicons

const ConversationList = ({ currentUserId, onSelect, onNewMessage }) => {
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

    const fetchConversations = () => {
      socket.emit('get_all_conversations', currentUserId);
      socket.emit('get_unseen_count', currentUserId);
    };

    const handleConnect = () => {
      console.log('Socket connected for ConversationList');
      fetchConversations();
    };

    const handleConversations = (data) => {
      console.log('Received conversations:', data);
      const processedConversations = Array.isArray(data)
        ? data.map((conv) => ({
            ...conv,
            participants: conv.participants.map((p) => ({
              id: p.id,
              name: `${p.firstName} ${p.lastName}`,
              userName: p.user_name,
              avatarUrl: p.avatarUrl,
            })),
            unread: conv.unread || false,
          }))
        : [];

      setConversations(processedConversations);
      setLoading(false);
    };

    const handleUnseenCount = (count) => {
      console.log('Received unseen count:', count);
      setUnseenCount(count || 0);
    };

    const handleNewMessage = (message) => {
      console.log('New message received:', message);
      setConversations((prev) => {
        return prev.map((conv) => {
          const isPartOfConversation = conv.participants.some(
            (p) => p.id === message.senderId || p.id === message.receiverId
          );

          if (isPartOfConversation) {
            return {
              ...conv,
              lastMessage: message.content,
              timestamp: message.timestamp,
              unread: message.senderId !== currentUserId,
            };
          }
          return conv;
        });
      });

      // Update unseen count
      socket.emit('get_unseen_count', currentUserId);
    };

    // Initial setup
    if (socket.connected) {
      fetchConversations();
    } else {
      socket.connect();
    }

    // Socket event listeners
    socket.on('connect', handleConnect);
    socket.on('all_conversations', handleConversations);
    socket.on('unseen_count', handleUnseenCount);
    socket.on('receive_message', handleNewMessage);
    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError('Failed to connect to messaging service. Please refresh.');
      setLoading(false);
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('all_conversations', handleConversations);
      socket.off('unseen_count', handleUnseenCount);
      socket.off('receive_message', handleNewMessage);
      socket.off('connect_error');
    };
  }, [currentUserId]);

  const handleSelectConversation = (conversation) => {
    const otherUser = conversation.participants.find((p) => p.id !== currentUserId);
    if (!otherUser) return;

    console.log('Fetching conversation history with:', otherUser.id);

    // Mark as read
    socket.emit('mark_as_read', {
      userId: currentUserId,
      otherUserId: otherUser.id,
    });

    // Fetch conversation history
    socket.emit('get_conversation', {
      userId: currentUserId,
      otherUserId: otherUser.id,
    });

    // Handle the response
    const handleHistory = (history) => {
      console.log('Received conversation history:', history);

      // Update the conversation's unread status
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === conversation.id ? { ...conv, unread: false } : conv
        )
      );

      // Pass the selected conversation and history to parent
      if (onSelect) {
        onSelect({
          ...conversation,
          otherUser,
          messages: Array.isArray(history) ? history : [],
        });
      }

      // Remove the listener after use
      socket.off('conversation_history', handleHistory);
    };

    socket.on('conversation_history', handleHistory);

    // Update unseen count
    socket.emit('get_unseen_count', currentUserId);
  };

  // Loading state
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

  // Error state
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

  // Empty state
  if (conversations.length === 0) {
    return (
      <div className="relative w-full h-full overflow-y-auto divide-y">
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="mb-6">
          <img src="/placeholder-messages.png" alt="No conversations" className="w-32 mx-auto" />
        </div>
        <h2 className="text-xl font-medium mb-2">No conversations yet</h2>
        <p className="text-gray-600">Start a new conversation to begin messaging</p>
       <button
        onClick={onNewMessage}
        className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-10"
       >
        <PencilIcon className="h-6 w-6" />
      </button>
      </div>
      </div>  
    );
  }

  // Conversation list
  return (
    <div className="relative w-full h-full overflow-y-auto divide-y">
      {/* Floating New Message Button */}
      <button
        onClick={onNewMessage}
        className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-10"
      >
        <PencilIcon className="h-6 w-6" />
      </button>

      {conversations.map((conversation) => {
        const otherUser = conversation.participants.find((p) => p.id !== currentUserId) || {};
        const lastMessageTime = conversation.timestamp
          ? new Date(conversation.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
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
                <div className="relative w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
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
                        {otherUser.name ? otherUser.name.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">
                    {otherUser.name || otherUser.userName || 'Unknown User'}
                  </p>
                  <p
                    className={`text-sm truncate ${
                      conversation.unread ? 'font-medium text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {conversation.lastMessage || 'No messages yet'}
                  </p>
                </div>
              </div>
              <div className="ml-4 flex flex-col items-end">
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {lastMessageTime}
                </span>
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