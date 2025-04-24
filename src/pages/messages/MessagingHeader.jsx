
import React from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
const MessagingHeader = () => {
  return (
<div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-medium">Messaging</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search messages"
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full w-64 focus:outline-none"
            />
          </div>
          <button className="text-gray-600">
            <MoreHorizontal className="h-5 w-5" />
          </button>
          <button className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>

  );
};
export default MessagingHeader;