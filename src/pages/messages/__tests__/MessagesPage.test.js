import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import MessagesPage from '../MessagesPage';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  Outlet: () => <div>Outlet</div>,
}));

jest.mock('socket.io-client', () => jest.fn(() => ({
  on: jest.fn((event, callback) => {
    if (event === 'all_conversations') callback([]);
  }),
  off: jest.fn(),
  emit: jest.fn(),
  disconnect: jest.fn(),
  connected: true,
})));

describe('MessagesPage', () => {
  const mockNavigate = jest.fn();
  let mockSocket;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSocket = {
      on: jest.fn((event, callback) => {
        if (event === 'all_conversations') callback([]);
      }),
      off: jest.fn(),
      emit: jest.fn(),
      disconnect: jest.fn(),
      connected: true,
    };
    
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ pathname: '/messages', state: {} });
    io.mockReturnValue(mockSocket);
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXIxIn0.signature');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('redirects to login if no token', () => {
    localStorage.clear();
    render(<MessagesPage />);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('renders conversation list and chat window', async () => {
    const mockConversations = [{
      id: 'conv1', 
      otherUserId: 'user2', 
      lastMessage: 'Hi', 
      participants: [{ id: 'user2', name: 'Jane' }] 
    }];
    
    render(<MessagesPage />);
    mockSocket.on.mock.calls.find(call => call[0] === 'all_conversations')[1](mockConversations);
    
    await waitFor(() => {
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
  });

  it('shows requests page when on /messages/requests', () => {
    useLocation.mockReturnValue({ pathname: '/messages/requests', state: {} });
    render(<MessagesPage />);
    expect(screen.getByText('Outlet')).toBeInTheDocument();
  });

  it('handles new message button', () => {
    render(<MessagesPage />);
    fireEvent.click(screen.getByText('New Message'));
    expect(screen.getByText('New Message')).toBeInTheDocument();
  });
});