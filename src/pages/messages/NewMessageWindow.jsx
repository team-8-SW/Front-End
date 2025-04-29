import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Paperclip, Image, MoreHorizontal, X } from 'lucide-react';
import { getConnections, searchUsers } from '../../services/api';
import socket from '../../services/socket';

const NewMessageWindow = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const messagesEndRef = useRef(null);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);
    const userId = decoded?.id;
    setCurrentUserId(userId);
    if (!userId) {
      console.error('No user ID found in token');
      return;
    }

    const handleConnect = () => {
      console.log('Socket connected:', socket.id);
      socket.emit('join', userId);
      socket.emit('join_room', userId);
    };

    if (socket.connected) {
      handleConnect();
    }

    socket.on('connect', handleConnect);

    return () => {
      socket.off('connect', handleConnect);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMessage = (message) => {
    const otherUserId =
      message.senderId === currentUserId ? message.receiverId : message.senderId;

    setMessages((prev) => ({
      ...prev,
      [otherUserId]: [...(prev[otherUserId] || []), message],
    }));

    scrollToBottom();
  };

  useEffect(() => {
    if (!currentUserId) return;

    socket.on('receive_message', handleMessage);
    socket.on('conversation_history', (history) => {
      console.log('Received conversation history:', history);
      if (selectedRecipients.length === 1 && Array.isArray(history)) {
        const selectedUserId = selectedRecipients[0].id;
        setMessages((prev) => ({
          ...prev,
          [selectedUserId]: history,
        }));
        scrollToBottom();
      }
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    return () => {
      socket.off('receive_message', handleMessage);
      socket.off('conversation_history');
      socket.off('connect_error');
    };
  }, [currentUserId, selectedRecipients]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token is missing');
          return;
        }

        const conn = await getConnections(token);
        console.log('Fetched connections:', conn.connections);
        setConnections(conn.connections || []);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const token = localStorage.getItem('token');
        const response = await searchUsers(token, { q: query });
        console.log('Search results:', response.users);

        setSearchResults(response.users);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectRecipient = (user) => {
    if (!selectedRecipients.some((r) => r.id === user.userId)) {
      const newRecipient = {
        id: user.userId,
        name: `${user.firstName} ${user.lastName}`,
      };
      setSelectedRecipients([newRecipient]);

      if (currentUserId) {
        console.log('Fetching conversation for:', { userId: currentUserId, otherUserId: user.userId });
        socket.emit('get_conversation', {
          userId: currentUserId,
          otherUserId: user.userId,
        });
      }
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRemoveRecipient = (userId) => {
    setSelectedRecipients(selectedRecipients.filter((r) => r.id !== userId));
    setMessages((prev) => {
      const updated = { ...prev };
      delete updated[userId];
      return updated;
    });
  };

  const handleSendMessage = () => {
    const trimmed = messageContent.trim();
    if (trimmed.length <= 3 || selectedRecipients.length !== 1) return;

    const recipient = selectedRecipients[0];
    const message = {
      senderId: currentUserId,
      receiverId: recipient.id,
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    socket.emit('send_text', message);
    handleMessage(message);
    setMessageContent('');
  };

  const filteredConnections = searchQuery.length > 2 ? searchResults : [];

  return (
    <div className="w-2/3 flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-medium"> message</h2>
      </div>

      <div className="p-4 border-b flex flex-wrap items-center">
        {selectedRecipients.map((recipient) => (
          <div
            key={recipient.id}
            className="flex items-center bg-green-800 text-white px-2 py-1 rounded-full mr-2 mb-2"
          >
            <span>{recipient.name}</span>
            <button
              onClick={() => handleRemoveRecipient(recipient.id)}
              className="ml-1"
              aria-label="Remove recipient"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type a name or multiple names"
            className="w-full p-2 focus:outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button className="ml-2" aria-label="Add recipient">
          <PlusCircle className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {filteredConnections.length > 0 && (
        <div className="flex-1 p-4 overflow-y-auto max-h-64">
          {filteredConnections.map((connection) => (
            <div
              key={connection.userId}
              className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50"
              onClick={() => handleSelectRecipient(connection)}
            >
              <div className="relative mr-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  {connection.avatarUrl ? (
                    <img
                      src={connection.avatarUrl}
                      alt={connection.name}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = '/default-avatar.png';
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    <span className="text-gray-500 text-lg">
                      {connection.firstName
                        ? connection.firstName[0] + (connection.lastName?.[0] || '')
                        : '??'}
                    </span>
                  )}
                </div>
                {connection.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <div className="font-medium">
                  {connection.firstName} {connection.lastName}
                  {connection.connectionDegree && (
                    <span className="text-gray-500 font-normal text-sm">
                      {' · '}
                      {connection.connectionDegree}
                    </span>
                  )}
                </div>
                {connection.title && (
                  <div className="text-sm text-gray-600">{connection.title}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-2">
        {selectedRecipients.length === 1 &&
          messages[selectedRecipients[0].id]?.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 rounded-lg max-w-md ${
                  msg.senderId === currentUserId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                }`}
              >
                <div className="text-sm">{msg.content}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto border-t">
        <textarea
          placeholder="Write a message..."
          className="w-full p-4 resize-none focus:outline-none h-32"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
        ></textarea>

        <div className="flex justify-between items-center p-3 border-t">
          <div className="flex space-x-4">
            <button aria-label="Attach image">
              <Image className="h-5 w-5 text-gray-600" />
            </button>
            <button aria-label="Attach file">
              <Paperclip className="h-5 w-5 text-gray-600" />
            </button>
            <button aria-label="Send GIF">
              <span className="font-bold">GIF</span>
            </button>
            <button aria-label="Emoji picker">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSendMessage}
              className={`px-4 py-1 rounded-full ${
                selectedRecipients.length > 0 && messageContent.trim()
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
              disabled={selectedRecipients.length === 0 || !messageContent.trim()}
              aria-label="Send message"
            >
              Send
            </button>
            <button aria-label="More options">
              <MoreHorizontal className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMessageWindow;