import React, { useState, useEffect, useRef } from 'react';
import socket from '../../services/socket';

const ChatWindow = ({ conversation, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [lastSeenMessageId, setLastSeenMessageId] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // State for typing indicator
  const messagesEndRef = useRef(null);

  const otherUser = conversation?.participants.find((p) => p.id !== currentUserId) || {};

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize messages and set up WebSocket listeners
  useEffect(() => {
    if (conversation?.messages) {
      const mappedMessages = conversation.messages.map((msg) => ({
        id: msg.id,
        senderId: msg.sender_id,
        receiverId: msg.receiver_id,
        content: msg.content,
        timestamp: msg.sent_at,
        isSender: msg.sender_id === currentUserId,
        mediaUrl: msg.media_url,
        mediaType: msg.media_type,
        is_Read: msg.sender_id === currentUserId ? 'sent' : null,
      }));
      setMessages(mappedMessages);
      setTimeout(scrollToBottom, 100);
    }

    socket.emit('join_room', currentUserId);

    if (otherUser.id) {
      socket.emit('get_read_status', { userId2: otherUser.id });
      socket.emit('get_typing_status', { senderId: currentUserId, receiverId: otherUser.id });
    }

    const handleNewMessage = (message) => {
      const isRelevantMessage =
        (message.senderId === currentUserId && message.receiverId === otherUser.id) ||
        (message.senderId === otherUser.id && message.receiverId === currentUserId);

      if (isRelevantMessage) {
        setMessages((prev) => {
          const updatedMessages = [
            ...prev,
            {
              id: message.id,
              senderId: message.senderId,
              receiverId: message.receiverId,
              content: message.content,
              timestamp: message.timestamp,
              isSender: message.senderId === currentUserId,
              mediaUrl: message.media ? message.media.url : null,
              mediaType: message.media ? message.media.type : null,
              status: message.senderId === currentUserId ? 'sent' : null,
            },
          ];

          if (lastSeenMessageId) {
            return updateMessageStatuses(updatedMessages);
          }
          return updatedMessages;
        });
        setTimeout(scrollToBottom, 100);
      }
    };

    const updateMessageStatuses = (msgs) => {
      if (!lastSeenMessageId) return msgs;

      let lastSeenIndex = -1;
      for (let i = 0; i < msgs.length; i++) {
        if (msgs[i].id === lastSeenMessageId) {
          lastSeenIndex = i;
          break;
        }
      }

      if (lastSeenIndex === -1) return msgs;

      return msgs.map((msg, index) => {
        if (!msg.isSender) return msg;
        if (index <= lastSeenIndex) {
          return { ...msg, status: 'read' };
        }
        return { ...msg, status: 'sent' };
      });
    };

    const handleReadStatus = (status) => {
      setLastSeenMessageId(status.lastMessageId);
      setMessages((prev) => {
        const updatedMessages = [...prev];
        if (status.isRead) {
          return updateMessageStatuses(updatedMessages);
        }
        return updatedMessages;
      });
    };

    const handleConversationRead = ({ by }) => {
      if (by === otherUser.id) {
        socket.emit('get_read_status', { userId2: otherUser.id });
      }
    };

    const handleTyping = (data) => {
      if (data.from === otherUser.id) {
        socket.emit('get_typing_status', { senderId: currentUserId, receiverId: otherUser.id });
      }
    };

    const handleTypingStatus = (data) => {
      if (data.senderId === currentUserId && data.receiverId === otherUser.id) {
        setIsTyping(data.isTyping);
      }
    };

    socket.on('receive_message', handleNewMessage);
    socket.on('read_status', handleReadStatus);
    socket.on('conversation_read', handleConversationRead);
    socket.on('typing', handleTyping);
    socket.on('typing_status', handleTypingStatus);
    socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
    });

    return () => {
      socket.off('receive_message', handleNewMessage);
      socket.off('read_status', handleReadStatus);
      socket.off('conversation_read', handleConversationRead);
      socket.off('typing', handleTyping);
      socket.off('typing_status', handleTypingStatus);
      socket.off('connect_error');
    };
  }, [conversation, currentUserId, otherUser.id]);

  // Additional scroll to bottom when component mounts
  useEffect(() => {
    setTimeout(scrollToBottom, 300);
  }, []);

  // Emit typing event when user types
  const handleTyping = () => {
    if (conversation) {
      const otherUser = conversation.participants.find((p) => p.id !== currentUserId);
      if (otherUser) {
        socket.emit('typing', { senderId: currentUserId, receiverId: otherUser.id });
      }
    }
  };

  const handleSendMessage = () => {
    const trimmed = messageContent.trim();
    if (trimmed.length < 1 || !conversation) return;

    const otherUser = conversation.participants.find((p) => p.id !== currentUserId);
    if (!otherUser) return;

    const message = {
      senderId: currentUserId,
      receiverId: otherUser.id,
      content: trimmed,
    };

    socket.emit('send_text', message);

    setMessages((prev) => {
      const updatedMessages = [
        ...prev,
        {
          id: `temp-${Date.now()}`,
          senderId: currentUserId,
          receiverId: otherUser.id,
          content: trimmed,
          timestamp: new Date().toISOString(),
          isSender: true,
          status: 'sent',
        },
      ];

      if (lastSeenMessageId) {
        return updateMessageStatuses(updatedMessages);
      }
      return updatedMessages;
    });

    setMessageContent('');
    setTimeout(scrollToBottom, 100);
  };

  const handleQuickReply = (text) => {
    setMessageContent(text);
    handleSendMessage();
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    if (isToday) {
      return date
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        .replace(' ', ':')
        .toLowerCase();
    }
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  };

  const groupMessagesByDay = (messages) => {
    const groups = [];
    let currentGroup = { day: null, messages: [] };

    messages.forEach((msg) => {
      const msgDate = new Date(msg.timestamp).toDateString();
      if (currentGroup.day === null || msgDate !== currentGroup.day) {
        if (currentGroup.messages.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = { day: msgDate, messages: [] };
      }
      currentGroup.messages.push(msg);
    });

    if (currentGroup.messages.length > 0) {
      groups.push(currentGroup);
    }
    return groups;
  };

  const messageGroups = groupMessagesByDay(messages);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-500">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center bg-gray-50">
        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mr-3">
          {otherUser.avatarUrl ? (
            <img
              src={otherUser.avatarUrl}
              alt={otherUser.name}
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg text-white">{otherUser.name?.charAt(0) || '?'}</span>
          )}
        </div>
        <div>
          <p className="font-semibold text-lg">{otherUser.name || 'Unknown User'}</p>
          <p className="text-sm text-gray-600">{otherUser.title || ''}</p>
        </div>
        <div className="ml-auto flex space-x-3">
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="4" cy="10" r="2" />
              <circle cx="10" cy="10" r="2" />
              <circle cx="16" cy="10" r="2" />
            </svg>
          </button>
          <button className="text-purple-600 hover:text-purple-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {messageGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="text-center text-xs text-gray-500 my-6">
              {formatTimestamp(new Date(group.day))}
            </div>
            {group.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-4 ${msg.isSender ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isSender && (
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mr-3 self-end">
                    <span className="text-sm text-white">{otherUser.name?.charAt(0) || '?'}</span>
                  </div>
                )}
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.isSender ? 'bg-blue-400 text-white' : 'bg-white text-gray-800'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <p className="font-medium mr-2">{msg.isSender ? "" : otherUser.name}</p>
                  </div>
                  <p className="mt-1">{msg.content}</p>
                  {msg.isSender && (
                    <div className="flex justify-end mt-1">
                      <span
                        className={`text-xs ${
                          msg.status === 'read' ? 'text-blue-500' : 'text-gray-400'
                        }`}
                      >
                        {msg.status === 'sent' ? 'Sent' : 'Read'}
                      </span>
                    </div>
                  )}
                </div>
                {msg.isSender && (
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center ml-3 self-end">
                    <span className="text-sm text-white">{otherUser.name?.charAt(0) || '?'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        {isTyping && (
          <div className="text-sm text-gray-500 italic mb-2">
            {otherUser.name || 'User'} is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick reply buttons */}
      <div className="p-4 flex space-x-3">
        {['Hello', 'Hi', 'How are you?'].map((text) => (
          <button
            key={text}
            onClick={() => handleQuickReply(text)}
            className="px-4 py-1.5 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 text-sm font-medium"
          >
            {text}
          </button>
        ))}
      </div>

      {/* Message input */}
      <div className="p-4 border-t bg-white flex items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Write a message..."
            className="w-full p-3 pr-10 border rounded-lg bg-gray-100 text-gray-600 focus:outline-none"
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
              handleTyping();
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        <div className="ml-3 flex space-x-3">
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l6.586-6.586a4 4 0 00-5.656-5.656L5.757 10.757a6 6 0 008.486 8.486L21 12"
              />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <span className="text-sm font-medium">GIF</span>
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            onClick={handleSendMessage}
            className="px-4 py-1.5 bg-gray-200 rounded-full hover:bg-gray-300 text-sm font-medium"
          >
            Send
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="4" cy="10" r="2" />
              <circle cx="10" cy="10" r="2" />
              <circle cx="16" cy="10" r="2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;