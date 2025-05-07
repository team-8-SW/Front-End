import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConversationList from '../ConversationList';
import socket from '../../services/socket';

jest.mock('../../services/socket');

describe('ConversationList', () => {
  const mockOnSelect = jest.fn();
  const mockOnNewMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    socket.on.mockImplementation((event, callback) => {
      if (event === 'all_conversations') callback([]);
      if (event === 'connect_error') callback(new Error('Connection error'));
    });
  });

  it('renders loading state', () => {
    render(<ConversationList currentUserId="user1" onSelect={mockOnSelect} onNewMessage={mockOnNewMessage} />);
    expect(screen.getAllByRole('status')).toHaveLength(5);
  });

  it('renders conversations', async () => {
    const mockConversations = [{
      id: 'conv1',
      participants: [
        { id: 'user1', name: 'Me' },
        { id: 'user2', name: 'Jane' },
      ],
      lastMessage: 'Hi',
      timestamp: '2023-10-01T12:00:00Z',
    }];
    
    render(<ConversationList currentUserId="user1" onSelect={mockOnSelect} onNewMessage={mockOnNewMessage} />);
    
    // Trigger the socket callback
    socket.on.mock.calls.find(call => call[0] === 'all_conversations')[1](mockConversations);
    
    await waitFor(() => {
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.getByText('Hi')).toBeInTheDocument();
    });
  });

  it('selects a conversation', async () => {
    const mockConversations = [{
      id: 'conv1',
      participants: [
        { id: 'user1', name: 'Me' },
        { id: 'user2', name: 'Jane' },
      ],
      lastMessage: 'Hi',
    }];
    
    render(<ConversationList currentUserId="user1" onSelect={mockOnSelect} onNewMessage={mockOnNewMessage} />);
    socket.on.mock.calls.find(call => call[0] === 'all_conversations')[1](mockConversations);
    
    await waitFor(() => screen.getByText('Jane'));
    fireEvent.click(screen.getByText('Jane'));
    expect(mockOnSelect).toHaveBeenCalledWith('conv1');
  });

  it('handles new message button', () => {
    render(<ConversationList currentUserId="user1" onSelect={mockOnSelect} onNewMessage={mockOnNewMessage} />);
    fireEvent.click(screen.getByRole('button', { name: /PencilIcon/i }));
    expect(mockOnNewMessage).toHaveBeenCalled();
  });

  it('displays error state', async () => {
    render(<ConversationList currentUserId="user1" onSelect={mockOnSelect} onNewMessage={mockOnNewMessage} />);
    socket.on.mock.calls.find(call => call[0] === 'connect_error')[1](new Error('Connection error'));
    
    await waitFor(() => {
      expect(screen.getByText('Connection error. Please refresh.')).toBeInTheDocument();
    });
  });
});