import React, { useState, useEffect } from 'react';
import socket from '../../services/socket';

const NewMessageWindow = ({ currentUserId, onStartConversation, onCancel }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      // Simulate API call - replace with your actual user search API
      socket.emit('search_users', { query, currentUserId }, (results) => {
        setSearchResults(results);
        setIsSearching(false);
      });
    } catch (error) {
      console.error('Search error:', error);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <button 
            onClick={onCancel}
            className="mr-2 p-1 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <h2 className="text-lg font-medium">New message</h2>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Type a name or multiple names"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {isSearching ? (
          <div className="p-4 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="divide-y">
            {searchResults.map((user) => (
              <div
                key={user.id}
                onClick={() => onStartConversation(user)}
                className="p-4 cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        <span className="text-gray-600 font-medium">
                          {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    {user.title && (
                      <p className="text-sm text-gray-500">{user.title}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="p-4 text-center text-gray-500">
            No results found for "{searchQuery}"
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Start typing to search for users
          </div>
        )}
      </div>
    </div>
  );
};

export default NewMessageWindow;