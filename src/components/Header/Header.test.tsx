import { render, screen, fireEvent } from '@test-utils';
import { Header } from './Header';

describe('Header component', () => {
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
});
