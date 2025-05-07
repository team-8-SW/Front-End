import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import MessageRequests from '../MessageRequestsPage';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('socket.io-client', () => jest.fn(() => ({
  on: jest.fn((event, callback) => {
    if (event === 'message_requests') callback([]);
    if (event === 'connect_error') callback(new Error('Socket error'));
  }),
  off: jest.fn(),
  emit: jest.fn(),
  disconnect: jest.fn(),
  connected: true,
})));

describe('MessageRequests', () => {
  const mockNavigate = jest.fn();
  let mockSocket;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSocket = {
      on: jest.fn((event, callback) => {
        if (event === 'message_requests') callback([]);
        if (event === 'connect_error') callback(new Error('Socket error'));
      }),
      off: jest.fn(),
      emit: jest.fn(),
      disconnect: jest.fn(),
      connected: true,
    };
    
    useNavigate.mockReturnValue(mockNavigate);
    io.mockReturnValue(mockSocket);
    localStorage.setItem('user', JSON.stringify({ _id: 'user1', name: 'Test User' }));
    localStorage.setItem('token', 'mock-token');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders loading state initially', () => {
    render(<MessageRequests />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders requests after receiving socket data', async () => {
    const mockRequests = [{
      id: 'req1',
      participants: [
        { id: 'user1' }, 
        { id: 'user2', firstName: 'Jane', lastName: 'Doe', userName: 'jane' }
      ],
      lastMessage: 'Hello',
    }];
    
    render(<MessageRequests />);
    mockSocket.on.mock.calls.find(call => call[0] === 'message_requests')[1](mockRequests);
    
    await waitFor(() => {
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('@"jane"')).toBeInTheDocument();
      expect(screen.getByText('"Hello"')).toBeInTheDocument();
    });
  });

  it('handles accept button click', async () => {
    const mockRequests = [{
      id: 'req1',
      participants: [
        { id: 'user1' }, 
        { id: 'user2', firstName: 'Jane', lastName: 'Doe' }
      ],
    }];
    
    render(<MessageRequests />);
    mockSocket.on.mock.calls.find(call => call[0] === 'message_requests')[1](mockRequests);
    
    await waitFor(() => screen.getByText('Jane Doe'));
    fireEvent.click(screen.getByText('Accept'));
    
    expect(mockSocket.emit).toHaveBeenCalledWith(
      'accept_message_request', 
      { senderId: 'user2' }, 
      expect.any(Function)
    );
  });

  it('handles reject button click', async () => {
    const mockRequests = [{
      id: 'req1',
      participants: [
        { id: 'user1' }, 
        { id: 'user2', firstName: 'Jane', lastName: 'Doe' }
      ],
    }];
    
    render(<MessageRequests />);
    mockSocket.on.mock.calls.find(call => call[0] === 'message_requests')[1](mockRequests);
    
    await waitFor(() => screen.getByText('Jane Doe'));
    fireEvent.click(screen.getByText('Reject'));
    
    expect(mockSocket.emit).toHaveBeenCalledWith(
      'decline_request', 
      { senderId: 'user2' }, 
      expect.any(Function)
    );
  });

  it('displays error state', async () => {
    render(<MessageRequests />);
    mockSocket.on.mock.calls.find(call => call[0] === 'connect_error')[1](new Error('Socket error'));
    
    await waitFor(() => {
      expect(screen.getByText('Error: Socket error')).toBeInTheDocument();
    });
  });

  it('handles back button click', async () => {
    render(<MessageRequests />);
    mockSocket.on.mock.calls.find(call => call[0] === 'message_requests')[1]([]);
    
    await waitFor(() => screen.getByText('No message requests at the moment.'));
    fireEvent.click(screen.getByText('Go Back'));
    
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});