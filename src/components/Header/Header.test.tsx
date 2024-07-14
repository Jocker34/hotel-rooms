import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';

describe('Header component', () => {
  test('renders Mantine logo', () => {
    render(<Header />);
    const logoElement = screen.getByRole('img', { name: /mantine logo/i });
    expect(logoElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Header />);
    const navLink = screen.getByText(/Rooms/i);
    expect(navLink).toBeInTheDocument();
  });

  test('sets active link on click', () => {
    render(<Header />);
    const navLink = screen.getByText(/Rooms/i);
    fireEvent.click(navLink);
    expect(navLink).toHaveAttribute('data-active', 'true');
  });

  test('toggles burger menu on click', () => {
    render(<Header />);
    const burgerButton = screen.getByRole('button');
    expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(burgerButton);
    expect(burgerButton).toHaveAttribute('aria-expanded', 'true');
  });
});
