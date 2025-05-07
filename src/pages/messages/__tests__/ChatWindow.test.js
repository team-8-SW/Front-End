import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatWindow from '../ChatWindow';
import socket from '../../services/socket';

jest.mock('../../services/socket');

describe('ChatWindow', () => {
  const mockConversation = {
    participants: [
      { id: 'user1', name: 'Me' },
      { id: 'user2', name: 'Jane' },
    ],
    messages: [
      { id: 'msg1', sender_id: 'user2', content: 'Hi', sent_at: '2023-10-01T12:00:00Z' },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    socket.emit.mockClear();
    socket.on.mockImplementation((event, callback) => {
      if (event === 'typing') callback({ from: 'user2' });
    });
  });

  it('renders messages from conversation', () => {
    render(<ChatWindow conversation={mockConversation} currentUserId="user1" />);
    expect(screen.getByText('Hi')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('sends a text message', () => {
    render(<ChatWindow conversation={mockConversation} currentUserId="user1" />);
    fireEvent.change(screen.getByPlaceholderText('Write a message...'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByText('Send'));
    expect(socket.emit).toHaveBeenCalledWith('send_text', expect.objectContaining({
      content: 'Hello',
      receiverId: 'user2'
    }));
  });

  it('handles media upload', async () => {
    render(<ChatWindow conversation={mockConversation} currentUserId="user1" />);
    const fileInput = screen.getByLabelText('file-input');
    const file = new File(['content'], 'image.png', { type: 'image/png' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(socket.emit).toHaveBeenCalledWith(
        'send_media', 
        expect.objectContaining({
          file: expect.any(Object),
          receiverId: 'user2'
        }), 
        expect.any(Function)
      );
    });
  });

  it('shows typing indicator', async () => {
    render(<ChatWindow conversation={mockConversation} currentUserId="user1" />);
    await waitFor(() => {
      expect(screen.getByText('Jane is typing...')).toBeInTheDocument();
    });
  });

  it('renders no conversation message', () => {
    render(<ChatWindow currentUserId="user1" />);
    expect(screen.getByText('Select a conversation to start messaging')).toBeInTheDocument();
  });
});