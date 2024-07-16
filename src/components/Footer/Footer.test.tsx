import { render, screen } from '@test-utils';
import { Footer } from './Footer';

describe('Footer component', () => {
  test('renders all footer links', () => {
    render(<Footer />);
    const links = ['Contact', 'Privacy', 'Blog', 'Careers'];
    links.forEach((linkText) => {
      const linkElement = screen.getByText(linkText);
      expect(linkElement).toBeInTheDocument();
    });
  });

  test('links have correct href attributes', () => {
    render(<Footer />);
    const linkElements = screen.getAllByRole('link');
    linkElements.forEach((linkElement) => {
      expect(linkElement).toHaveAttribute('href', '#');
    });
  });

  test('links prevent default onClick', () => {
    render(<Footer />);
    const linkElements = screen.getAllByRole('link');
    linkElements.forEach((linkElement) => {
      const mockClickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      linkElement.dispatchEvent(mockClickEvent);
      expect(mockClickEvent.defaultPrevented).toBe(true);
    });
  });
});
