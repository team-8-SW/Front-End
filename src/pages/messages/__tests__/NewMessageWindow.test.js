import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewMessageWindow from '../NewMessageWindow';
import socket from '../../services/socket';
import * as api from '../../services/api';

jest.mock('../../services/socket');
jest.mock('../../services/api');


describe('NewMessageWindow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('token', 'mock-token');
    
    // Setup default mock implementations
    socket.connected = true;
    api.searchUsers.mockResolvedValue({
      users: [{ userId: 'user2', firstName: 'Jane', lastName: 'Doe' }]
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders input and recipient selection', () => {
    render(<NewMessageWindow />);
    expect(screen.getByPlaceholderText('Type a name or multiple names')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write a message...')).toBeInTheDocument();
  });

  it('searches users and selects recipient', async () => {
    api.searchUsers.mockResolvedValue({
      users: [{ userId: 'user2', firstName: 'Jane', lastName: 'Doe' }],
    });
    
    render(<NewMessageWindow />);
    fireEvent.change(screen.getByPlaceholderText('Type a name or multiple names'), {
      target: { value: 'Jane' },
    });
    
    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Jane Doe'));
    expect(screen.getByText('Jane Doe')).toHaveClass('bg-green-800');
  });

  it('sends a message', async () => {
    api.searchUsers.mockResolvedValue({
      users: [{ userId: 'user2', firstName: 'Jane', lastName: 'Doe' }],
    });
    
    render(<NewMessageWindow />);
    fireEvent.change(screen.getByPlaceholderText('Type a name or multiple names'), {
      target: { value: 'Jane' },
    });
    
    await waitFor(() => screen.getByText('Jane Doe'));
    fireEvent.click(screen.getByText('Jane Doe'));
    
    fireEvent.change(screen.getByPlaceholderText('Write a message...'), {
      target: { value: 'Hello' },
    });
    
    fireEvent.click(screen.getByText('Send'));
    
    expect(socket.emit).toHaveBeenCalledWith('send_text', expect.objectContaining({
      content: 'Hello',
      receiverId: 'user2'
    }));
  });

  it('displays conversation history', async () => {
    const mockHistory = [{
      senderId: 'user1', 
      receiverId: 'user2', 
      content: 'Hi', 
      timestamp: '2023-10-01T12:00:00Z' 
    }];
    
    render(<NewMessageWindow />);
    socket.on.mock.calls.find(call => call[0] === 'conversation_history')[1](mockHistory);
    
    await waitFor(() => {
      expect(screen.getByText('Hi')).toBeInTheDocument();
    });
  });
});