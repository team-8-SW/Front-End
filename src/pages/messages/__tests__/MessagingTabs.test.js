import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import MessagingTabs from '../MessagingTabs';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../services/api', () => ({
  searchUsers: jest.fn(),
  getConnections: jest.fn(),
}));

jest.mock('../../services/socket', () => ({
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
}));


describe('MessagingTabs', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    api.searchUsers.mockClear();
    api.getConnections.mockClear();
  });

  it('renders all tabs', () => {
    render(<MessagingTabs />);
    ['Focused', 'Jobs', 'Unread', 'My Connections', 'InMail', 'Starred'].forEach(tab => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  it('changes active tab on click', () => {
    render(<MessagingTabs />);
    fireEvent.click(screen.getByText('Jobs'));
    expect(screen.getByText('Jobs')).toHaveClass('bg-green-800');
    expect(screen.getByText('Focused')).not.toHaveClass('bg-green-800');
  });

  it('navigates to requests page on Requests button click', () => {
    render(<MessagingTabs />);
    fireEvent.click(screen.getByText('Requests'));
    expect(mockNavigate).toHaveBeenCalledWith('/messages/requests');
  });

  it('opens new message window on new message button click', () => {
    render(<MessagingTabs />);
    fireEvent.click(screen.getByText('New Message'));
    expect(screen.getByText('New Message')).toBeInTheDocument();
  });
});