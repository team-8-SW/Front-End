import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import MessagingHeader from './MessagingHeader';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';
import RequestList from './RequestList';
import NewMessageWindow from './NewMessageWindow';
import MessagingTabs from './MessagingTabs';

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUserId(payload.id);
    } catch (error) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowNewMessage(false);
    if (isMobileView) {
      navigate(`/messages/${conversation.id}`);
    }
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setShowNewMessage(false);
    navigate('/messages');
  };

  const handleNewMessage = () => {
    setSelectedConversation(null);
    setShowNewMessage(true);
  };

  if (!currentUserId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-6 bg-white rounded shadow">
          <p className="text-red-500 mb-4">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <MessagingHeader />

      {/* Main Content */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Messaging Area (Left and Middle) */}
        <div className="flex flex-1 flex-col">
          {/* Messaging Tabs (spanning full width of conversation list and chat window) */}
          <div className="bg-white w-full border-b">
            <MessagingTabs handleNewMessage={handleNewMessage} />
          </div>

          {/* Conversation List and Chat Window Container */}
          <div className="flex flex-1 pt-4 pb-8 overflow-hidden">
            {/* Left Sidebar - Conversation List */}
            <div
              className={`w-full md:w-1/3 border-r bg-white ${
                isMobileView && (selectedConversation || showNewMessage) ? 'hidden' : 'block'
              }`}
            >
              {location.pathname.includes('/requests') ? (
                <RequestList currentUserId={currentUserId} />
              ) : (
                <ConversationList
                  currentUserId={currentUserId}
                  onSelect={handleSelectConversation}
                  onNewMessage={handleNewMessage}
                />
              )}
            </div>

            {/* Middle Content - Chat or New Message */}
            <div
              className={`w-full md:w-2/3 bg-gray-100 ${
                isMobileView && !(selectedConversation || showNewMessage) ? 'hidden' : 'block'
              }`}
            >
              {location.pathname.includes('/requests') ? (
                <div className="h-full overflow-auto">
                  <Outlet />
                </div>
              ) : showNewMessage ? (
                <NewMessageWindow onBack={handleBackToList} />
              ) : (
                <ChatWindow
                  conversation={selectedConversation}
                  currentUserId={currentUserId}
                  isMobile={isMobileView}
                  onBack={handleBackToList}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Premium Ad */}
        <div className="hidden lg:block w-1/4 border-l bg-[#F3F2EF] p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <p className="text-xs text-gray-500">Ad •••</p>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">
                Mohamed, unlock your full potential with LinkedIn Premium
              </h3>
              <div className="flex items-center mb-4">
                <div className="bg-[#FFEECC] text-[#915907] px-2 py-1 rounded-full text-xs font-bold mr-2">
                  Premium
                </div>
                <p className="text-sm text-gray-600">
                  See who's viewed your profile in the last 365 days
                </p>
              </div>
              <button className="w-full bg-[#0A66C2] text-white font-bold py-2 px-4 rounded-full mb-4 hover:bg-[#004182] transition">
                Try for free
              </button>
              <h4 className="font-semibold text-md mb-2">Get hired faster with Premium</h4>
              <p className="text-sm text-gray-600 mb-4">
                Premium InMail is 4.6x more effective in hearing back than cold email.
              </p>
              <div className="flex items-center mb-4">
                <div className="flex -space-x-2 mr-2">
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="User 1"
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/men/2.jpg"
                    alt="User 2"
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Mostafa and millions of other members use Premium
                </p>
              </div>
              <button className="w-full border border-[#0A66C2] text-[#0A66C2] font-bold py-2 px-4 rounded-full mb-4 hover:bg-[#E6F2FF] transition">
                Try Premium for EGP0
              </button>
              <p className="text-xs text-gray-500">
                1-month free trial. Cancel whenever. We'll remind you 7 days before your trial ends.
              </p>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Accessibility</a>
              <a href="#" className="hover:underline">Help Center</a>
              <a href="#" className="hover:underline">Privacy & Terms</a>
              <a href="#" className="hover:underline">Ad Choices</a>
              <a href="#" className="hover:underline">Advertising</a>
              <a href="#" className="hover:underline">Business Services</a>
              <a href="#" className="hover:underline">Get the LinkedIn app</a>
              <a href="#" className="hover:underline">More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;