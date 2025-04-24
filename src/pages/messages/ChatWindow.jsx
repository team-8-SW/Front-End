import React, { useState, useEffect } from 'react';
import { PlusCircle, Paperclip, Image, MoreHorizontal, X } from 'lucide-react';
import { getConnections, searchUsers} from '../../services/api';
import socket from '../../services/socket';

const ChatWindow = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [connections, setConnections] = useState([]);
  
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = parseJwt(token)?.userId;
  
    if (!userId) return;
  
    const handleConnect = () => {
      console.log('Socket connected:', socket.id);
      socket.emit('join', userId); // match the backend event
    };
  
    socket.on('connect', handleConnect);
  
    // Optional: reconnect on page reload
    if (socket.connected) {
      socket.emit('join', userId);
    }
  
    return () => {
      socket.off('connect', handleConnect);
      // Do NOT call socket.disconnect() unless you want to fully stop it — not needed here
    };
  }, []);
  

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token is missing');
          return;
        }

        const conn = await getConnections();
        setConnections(conn.connections); // assumes response format: { connections: [..] }
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

        const filtered = response.users.filter(
          user => connections.some(conn => conn.userId === user.userId)
        );

        setSearchResults(filtered);
      } catch (error) {
        console.error('Search failed:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectRecipient = (user) => {
    if (!selectedRecipients.some(r => r.id === user.userId)) {
      setSelectedRecipients([...selectedRecipients, { id: user.userId, name: user.name }]);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRemoveRecipient = (userId) => {
    setSelectedRecipients(selectedRecipients.filter(r => r.id !== userId));
  };

  const handleSendMessage = async () => {
    const trimmed = messageContent.trim();
    if (trimmed.length <= 3) return;
  
    const token = localStorage.getItem('token');
    const senderId = parseJwt(token)?.userId;
  
    for (const recipient of selectedRecipients) {
      socket.emit('send_text', {
        senderId,
        receiverId: recipient.id,
        content: trimmed,
      });
    }
  
    setMessageContent('');
    setSelectedRecipients([]);
  };
  
  const filteredConnections = searchQuery.length > 2 ? searchResults : [];

  return (
    <div className="w-2/3 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-medium">New message</h2>
      </div>

      {/* Recipients area */}
      <div className="p-4 border-b flex flex-wrap items-center">
        {selectedRecipients.map((recipient) => (
          <div key={recipient.id} className="flex items-center bg-green-800 text-white px-2 py-1 rounded-full mr-2 mb-2">
            <span>{recipient.name}</span>
            <button onClick={() => handleRemoveRecipient(recipient.id)} className="ml-1">
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
        <button className="ml-2">
          <PlusCircle className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Display filtered connections based on search */}
      {filteredConnections.length > 0 && (
        <div className="flex-1 p-4 overflow-y-auto max-h-64">
          {filteredConnections.map(connection => (
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
                    />
                  ) : (
                    <span className="text-gray-500 text-lg">
                    {connection.firstName ? connection.firstName.split(' ').map(n => n[0]).join('').substring(0, 2) : '??'}
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
                    <span className="text-gray-500 font-normal text-sm"> · {connection.connectionDegree}</span>
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

      {/* Message input area */}
      <div className="mt-auto border-t">
        <textarea
          placeholder="Write a message..."
          className="w-full p-4 resize-none focus:outline-none h-32"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        ></textarea>

        <div className="flex justify-between items-center p-3 border-t">
          <div className="flex space-x-4">
            <button>
              <Image className="h-5 w-5 text-gray-600" />
            </button>
            <button>
              <Paperclip className="h-5 w-5 text-gray-600" />
            </button>
            <button>
              <span className="font-bold">GIF</span>
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            >
              Send
            </button>
            <button>
              <MoreHorizontal className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;