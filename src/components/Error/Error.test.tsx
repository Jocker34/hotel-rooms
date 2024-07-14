import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Error } from './Error';

describe('Error component', () => {
  test('renders error label', () => {
    render(<Error />);
    const labelElement = screen.getByText(/Error/i);
    expect(labelElement).toBeInTheDocument();
  });

  test('renders error title', () => {
    render(<Error />);
    const titleElement = screen.getByText(/Something went wrong/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders error description', () => {
    render(<Error />);
    const descriptionElement = screen.getByText(/Please contact your administrator or try refreshing the page/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<Error />);
    expect(asFragment()).toMatchSnapshot();
  });
});
