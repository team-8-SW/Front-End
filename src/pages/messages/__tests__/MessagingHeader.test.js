import React from 'react';
import { render, screen } from '@testing-library/react';
import MessagingHeader from '../MessagingHeader';

describe('MessagingHeader', () => {
  it('renders the SVG icon', () => {
    render(<MessagingHeader />);
    // Use more specific query if getByRole isn't working
    const svgElement = screen.getByTestId('messaging-header-icon');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('h-5 w-5');
  });
});