import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const MessageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingRequest, setProcessingRequest] = useState(null);
  const navigate = useNavigate();
  const socketRef = useRef(null);

  // Get user data properly
  const userData = JSON.parse(localStorage.getItem('user')) || {};
  const userName = userData.name || 'Your Network';

  useEffect(() => {
    console.log('Initializing MessageRequests component');
    

    // Initialize socket connection
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token: localStorage.getItem("token") },
    });
    socketRef.current = socket;

    // Socket event handlers
    const handleMessageRequests = (data) => {
      console.log('Received requests:', data);
      if (Array.isArray(data)) {
        setRequests(data);
      } else {
        console.error('Invalid data format:', data);
        setRequests([]);
      }
      setLoading(false);
    };

    const handleNewRequest = (newRequest) => {
      setRequests(prev => {
        // Check for duplicates
        const exists = prev.some(req => req._id === newRequest._id || req.id === newRequest.id);
        return exists ? prev : [...prev, newRequest];
      });
    };

    socket.on('message_requests', handleMessageRequests);
    socket.on('receive_message_request', handleNewRequest);
    socket.on('message_request_accepted', (acceptedData) => {
    console.log("Accepted request data:", acceptedData);
    socket.on('decline_success', (data) => {
        console.log('Decline successful:', data.message);
      });
      
    
     
      setRequests(prev => prev.filter(req => req._id !== acceptedData.requestId && req.id !== acceptedData.requestId));
    
      // Optionally trigger refresh of main conversation list (e.g., via event, state, or context)
    });
    socket.on('connect_error', (err) => {
      console.error('Socket error:', err);
      fetchRequestsHTTP(); // Fallback to HTTP
    });

    // Initial request
    socket.emit('get_message_requests');

    return () => {
      socket.off('message_requests', handleMessageRequests);
      socket.off('receive_message_request', handleNewRequest);
      socket.disconnect();
    };
  }, []);

  const handleAccept = (requestId) => {
    const selectedRequest = requests.find(req => req.id === requestId);
    if (!selectedRequest) {
      setError("Request not found");
      return;
    }
  
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const currentUserId = currentUser?._id || currentUser?.id;
  
    const otherUser = selectedRequest.participants?.find(p => p.id !== currentUserId);
    const senderId = otherUser?.id;
  
    if (!senderId) {
      setError("Sender ID not found");
      return;
    }
  
    setProcessingRequest(requestId);
  
    socketRef.current.emit('accept_message_request', { senderId }, (response) => {
      if (response?.success) {
        setRequests(prev => prev.filter(req => req.id !== requestId));
      } else {
        setError('Failed to accept request');
        console.error(response?.error);
      }
      setProcessingRequest(null);
    });
  };
  
  const handleReject = (requestId) => {
    const selectedRequest = requests.find(req => req.id === requestId);
    if (!selectedRequest) {
      setError("Request not found");
      return;
    }
  
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const currentUserId = currentUser?._id || currentUser?.id;
  
    const otherUser = selectedRequest.participants?.find(p => p.id !== currentUserId);
    const senderId = otherUser?.id;
  
    if (!senderId) {
      setError("Sender ID not found");
      return;
    }
  
    setProcessingRequest(requestId);
  
    socketRef.current.emit('decline_request', { senderId }, (response) => {
      if (response?.success) {
        setRequests(prev => prev.filter(req => req.id !== requestId));
      } else {
        setError('Failed to decline request');
        console.error(response?.error);
      }
      setProcessingRequest(null);
    });
  };
  

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button onClick={handleBack} className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F3F2EF] justify-center">
      <div className="max-w-6xl w-full flex flex-row py-8 px-4 gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
              <button onClick={handleBack} className="mr-4 text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h2 className="text-2xl font-semibold">Message Requests</h2>
              {requests.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-gray-200 rounded-full text-sm">
                  {requests.length}
                </span>
              )}
            </div>

            {requests.length === 0 ? (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="mt-4 text-gray-500">No message requests at the moment.</p>
              </div>
            ) : (
              <ul className="space-y-4">
               {requests.map((request) => {
               const currentUser = JSON.parse(localStorage.getItem("user"));
              const currentUserId = currentUser?._id || currentUser?.id;

              // Find the other participant
             const otherUser = request.participants?.find(p => p.id !== currentUserId);

             const senderName = `${otherUser?.firstName || ''} ${otherUser?.lastName || ''}`.trim() || 'Unknown User';
              const senderInitial = senderName.charAt(0).toUpperCase();
              const senderUsername = otherUser?.userName || '';
              const messageContent = request.lastMessage || 'No message content';
              const requestId = request.id; // The unique request ID

   return (
    <li key={requestId} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-lg font-medium text-gray-600">{senderInitial}</span>
          </div>
          <div>
            <p className="font-medium">{senderName}</p>
            {senderUsername && <p className="text-sm text-gray-500">@{senderUsername}</p>}
            <p className="mt-2 text-gray-700">"{messageContent}"</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleAccept(requestId)}
            disabled={processingRequest === requestId}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              processingRequest === requestId
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
          {processingRequest === requestId ? 'Processing...' : 'Accept'} 
          </button>
          <button
            onClick={() => handleReject(requestId)}
            disabled={processingRequest === requestId}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              processingRequest === requestId
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {processingRequest === requestId ? 'Processing...' : 'Reject'}
          </button>
        </div>
      </div>
    </li>
  );
})}

              </ul>
            )}
          </div>
        </div>

        {/* Right Sidebar - unchanged */}
      </div>
    </div>
  );
};

export default MessageRequests;