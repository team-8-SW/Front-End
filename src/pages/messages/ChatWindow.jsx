import React, { useState, useEffect, useRef } from 'react';
import { Paperclip, Image, Send } from 'lucide-react';
import socket from '../../services/socket';


const ChatWindow = ({ conversation, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!conversation || !currentUserId) return;

    const otherUser = conversation.participants.find(p => p.id !== currentUserId);
    if (!otherUser) return;

    // Fetch conversation history
    socket.emit('get_conversation', {
      userId: currentUserId,
      otherUserId: otherUser.id
    });

    const handleConversationHistory = (history) => {
      if (Array.isArray(history)) {
        setMessages(history);
        scrollToBottom();
      } else {
        console.error('Invalid conversation history format:', history);
        setMessages([]);
      }
    };

    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    };

    const handleTyping = () => {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    };

    socket.on('conversation_history', handleConversationHistory);
    socket.on('receive_message', handleNewMessage);
    socket.on('typing', handleTyping);

    return () => {
      socket.off('conversation_history', handleConversationHistory);
      socket.off('receive_message', handleNewMessage);
      socket.off('typing', handleTyping);
    };
  }, [conversation, currentUserId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!messageContent.trim() || !conversation) return;

    const otherUser = conversation.participants.find(p => p.id !== currentUserId);
    if (!otherUser) return;

    const message = {
      senderId: currentUserId,
      receiverId: otherUser.id,
      content: messageContent.trim(),
      timestamp: new Date().toISOString()
    };

    socket.emit('send_text', message);
    setMessageContent('');
  };

  const handleTyping = () => {
    if (!conversation) return;
    
    const otherUser = conversation.participants.find(p => p.id !== currentUserId);
    if (!otherUser) return;

    socket.emit('typing', {
      senderId: currentUserId,
      receiverId: otherUser.id
    });
  };

  const formatMessageTime = (timestamp) => {
    try {
      return format(parseISO(timestamp), 'h:mm a');
    } catch {
      return '';
    }
  };

  const formatMessageDate = (timestamp) => {
    try {
      return format(parseISO(timestamp), 'EEEE');
    } catch {
      return '';
    }
  };

  if (!conversation) {
    return (
      <div className="w-2/3 flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
          <p className="text-gray-600">Choose a chat to start messaging</p>
        </div>
      </div>
    );
  }

  const otherUser = conversation.participants.find(p => p.id !== currentUserId);

  return (
    <div className="w-2/3 flex flex-col border-l h-full">
      {/* Chat header */}
      <div className="p-4 border-b flex items-center bg-white">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center overflow-hidden">
          {otherUser?.avatarUrl ? (
            <img 
              src={otherUser.avatarUrl} 
              alt={otherUser.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600 font-medium">
              {otherUser?.name?.charAt(0) || '?'}
            </span>
          )}
        </div>
        <div>
          <h2 className="font-medium">{otherUser?.name || 'Unknown User'}</h2>
          {isTyping && <p className="text-xs text-gray-500">typing...</p>}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => {
          const showDate = index === 0 || 
            formatMessageDate(messages[index-1].timestamp) !== 
            formatMessageDate(message.timestamp);

          return (
            <React.Fragment key={message.id}>
              {showDate && (
                <div className="text-center my-4">
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-600">
                    {formatMessageDate(message.timestamp)}
                  </span>
                </div>
              )}
              <div className={`mb-4 flex ${
                message.senderId === currentUserId ? 'justify-end' : 'justify-start'
              }`}>
                <div
                  className={`max-w-md p-3 rounded-lg ${
                    message.senderId === currentUserId
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === currentUserId ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatMessageTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="border-t p-4 bg-white">
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-gray-700 mr-2">
            <Paperclip className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 mr-2">
            <Image className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 p-3 border rounded-lg focus:outline-none"
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
              handleTyping();
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageContent.trim()}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;