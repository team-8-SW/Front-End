import React, { useState, useEffect } from 'react';
import socket from '../../services/socket';


const RequestList = ({ currentUserId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUserId) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const fetchRequests = () => {
      socket.emit('get_message_requests', { receiver_id: currentUserId });
    };

    const handleRequests = (data) => {
      if (Array.isArray(data)) {
        setRequests(data);
      } else {
        setError('Invalid data format received');
      }
      setLoading(false);
    };

    const handleRequestUpdate = (updatedRequest) => {
      setRequests(prev => prev.filter(req => req.id !== updatedRequest.id));
    };

    if (socket.connected) fetchRequests();

    socket.on('connect', fetchRequests);
    socket.on('message_requests', handleRequests);
    socket.on('request_accepted', handleRequestUpdate);
    socket.on('request_declined', handleRequestUpdate);
    socket.on('error', (err) => {
      setError(err.message || 'Error fetching requests');
      setLoading(false);
    });

    return () => {
      socket.off('connect', fetchRequests);
      socket.off('message_requests', handleRequests);
      socket.off('request_accepted', handleRequestUpdate);
      socket.off('request_declined', handleRequestUpdate);
      socket.off('error');
    };
  }, [currentUserId]);

  const handleAccept = (requestId) => {
    socket.emit('accept_request', { 
      request_id: requestId,
      receiver_id: currentUserId 
    });
  };

  const handleDecline = (requestId) => {
    socket.emit('decline_request', { 
      request_id: requestId,
      receiver_id: currentUserId 
    });
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
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

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No pending requests</h3>
        <p className="mt-1 text-sm text-gray-500">When you receive message requests, they'll appear here.</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {requests.map(request => (
        <div key={request.id} className="p-4 hover:bg-gray-50 transition">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {request.sender_name?.charAt(0) || '?'}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-900">
                  {request.sender_name || `User ${request.sender_id}`}
                </h4>
                <span className="text-xs text-gray-500">
                  {format(new Date(request.sent_at), 'h:mm a')}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {request.content}
              </p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleAccept(request.id)}
                  className="px-3 py-1 text-xs font-medium rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(request.id)}
                  className="px-3 py-1 text-xs font-medium rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestList;