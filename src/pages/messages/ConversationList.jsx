import React, { useState, useEffect } from 'react';
import socket from '../../services/socket';
import { PencilIcon } from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

const ConversationList = ({ currentUserId, onSelect, onNewMessage }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredConvId, setHoveredConvId] = useState(null);

  const toggleReadStatus = (conversation, markAsRead) => {
    const otherUser = conversation.participants.find(p => p.id !== currentUserId);
    if (!otherUser) return;

    const event = markAsRead ? 'mark_as_read' : 'mark_as_unread';
    socket.emit(event, { otherUserId: otherUser.id });

    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversation.id ? { ...conv, unreadCount: markAsRead ? 0 : 1 } : conv
      )
    );
    socket.emit('get_unseen_count');
  };

  useEffect(() => {
    if (!currentUserId) {
      setError('User ID is missing');
      setLoading(false);
      return;
    }

    const fetchConversations = () => {
      socket.emit('get_all_conversations');
    };

    const handleConnect = () => {
      fetchConversations();
    };

    const handleConversations = (data) => {
      const processedConversations = Array.isArray(data)
        ? data.map(conv => ({
            ...conv,
            participants: conv.participants.map(p => ({
              id: p.id,
              name: `${p.firstName} ${p.lastName}`,
              userName: p.user_name,
              avatarUrl: p.avatarUrl,
            })),
            unreadCount: conv.unreadCount || 0
          }))
        : [];

      setConversations(processedConversations);
      setLoading(false);
    };

    const handleNewMessage = (message) => {
      setConversations(prev => {
        return prev.map(conv => {
          const isPartOfConversation = conv.participants.some(
            p => p.id === message.senderId || p.id === message.receiverId
          );

          if (isPartOfConversation) {
            return {
              ...conv,
              lastMessage: message.content,
              timestamp: message.timestamp,
              unreadCount: message.senderId !== currentUserId 
                ? (conv.unreadCount || 0) + 1 
                : conv.unreadCount
            };
          }
          return conv;
        });
      });
    };

    if (socket.connected) {
      fetchConversations();
    } else {
      socket.connect();
    }

    socket.on('connect', handleConnect);
    socket.on('all_conversations', handleConversations);
    socket.on('receive_message', handleNewMessage);
    socket.on('connect_error', (err) => {
      setError('Connection error. Please refresh.');
      setLoading(false);
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('all_conversations', handleConversations);
      socket.off('receive_message', handleNewMessage);
      socket.off('connect_error');
    };
  }, [currentUserId]);

  const handleSelectConversation = (conversation) => {
    const otherUser = conversation.participants.find(p => p.id !== currentUserId);
    if (!otherUser) return;

    // Mark as read
    socket.emit('mark_as_read', { otherUserId: otherUser.id });

    // Fetch conversation history
    socket.emit('get_conversation', { otherUserId: otherUser.id });

    const handleHistory = (history) => {
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
        )
      );

      if (onSelect) {
        onSelect({
          ...conversation,
          otherUser,
          messages: Array.isArray(history) ? history : [],
        });
      }
      socket.off('conversation_history', handleHistory);
    };

    socket.on('conversation_history', handleHistory);
    socket.emit('get_unseen_count');
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

  return (
    <div className="relative w-full h-full overflow-y-auto divide-y">
      <button
        onClick={onNewMessage}
        className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-10"
      >
        <PencilIcon className="h-6 w-6" />
      </button>

      {conversations.map(conversation => {
        const otherUser = conversation.participants.find(p => p.id !== currentUserId) || {};
        const lastMessageTime = conversation.timestamp
          ? new Date(conversation.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          : '';

        const isHovered = hoveredConvId === conversation.id;
        const hasUnread = conversation.unreadCount > 0;

        return (
          <div
            key={conversation.id}
            onMouseEnter={() => setHoveredConvId(conversation.id)}
            onMouseLeave={() => setHoveredConvId(null)}
            className={`relative p-4 cursor-pointer transition ${
              hasUnread ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div
              onClick={() => {
                handleSelectConversation(conversation);
                toggleReadStatus(conversation, true);
              }}
              className="flex items-center justify-between"
            >
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
                        {otherUser.name?.charAt(0).toUpperCase() || '?'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">
                    {otherUser.name || otherUser.userName || 'Unknown User'}
                  </p>
                  <p className={`text-sm truncate ${
                    hasUnread ? 'font-medium text-gray-900' : 'text-gray-500'
                  }`}>
                    {conversation.lastMessage || 'No messages yet'}
                  </p>
                </div>
              </div>
              <div className="ml-4 flex flex-col items-end">
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {lastMessageTime}
                </span>
                {conversation.unreadCount > 0 && (
                  <div className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs">
                    {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>

            {isHovered && (
              <div className="absolute top-2 right-2 group">
                <EllipsisVerticalIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                <div
                  className="absolute right-0 mt-1 w-36 bg-white border rounded shadow-lg z-10"
                  onMouseEnter={() => setHoveredConvId(conversation.id)}
                  onMouseLeave={() => setHoveredConvId(null)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleReadStatus(conversation, !hasUnread);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                  >
                    {hasUnread ? 'Mark as read' : 'Mark as unread'}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;