import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Rooms } from './Rooms';
import { useRooms } from '@/hooks/useRooms';
import { Room } from '@/schemas/roomSchema';

jest.mock('@/hooks/useRooms');

const mockUseRooms = useRooms as jest.MockedFunction<typeof useRooms>;

const mockData: Room[] = [
  { id: 1, name: 'Room A', price: { value: 100, currencyCode: 'USD' } },
  { id: 2, name: 'Room B', price: { value: 200, currencyCode: 'USD' } },
  { id: 3, name: 'Room C', price: { value: 150, currencyCode: 'USD' } },
  { id: 4, name: 'Room D', price: { value: 120, currencyCode: 'USD' } },
  { id: 5, name: 'Room E', price: { value: 180, currencyCode: 'USD' } },
];

describe('Rooms component', () => {
  beforeEach(() => {
    mockUseRooms.mockReturnValue({
      data: mockData,
      isPending: false,
      isError: false,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    mockUseRooms.mockReturnValueOnce({
      data: null,
      isPending: true,
      isError: false,
    } as any);

    render(<Rooms />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    mockUseRooms.mockReturnValueOnce({
      data: null,
      isPending: false,
      isError: true,
    } as any);

    render(<Rooms />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test('renders rooms and sorts by name (A-Z)', async () => {
    render(<Rooms />);
    const roomNames = mockData.map((room) => room.name).sort();
    roomNames.forEach(async (name) => {
      expect(await screen.findByText(name)).toBeInTheDocument();
    });

    const select = screen.getByPlaceholderText(/sort by/i);
    fireEvent.change(select, { target: { value: 'name-asc' } });
    const sortedRooms = screen.getAllByText(/Room/i);
    expect(sortedRooms[0]).toHaveTextContent('Room A');
  });

  test('renders rooms and sorts by price (Low to High)', async () => {
    render(<Rooms />);

    const select = screen.getByPlaceholderText(/sort by/i);
    fireEvent.change(select, { target: { value: 'price-asc' } });
    const sortedRooms = await screen.findAllByText(/Room/i);
    expect(sortedRooms[0]).toHaveTextContent('Room A');
    expect(sortedRooms[1]).toHaveTextContent('Room D');
  });

  test('renders pagination controls and paginates rooms', async () => {
    render(<Rooms />);
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/2/i));
    expect(screen.getByText(/Room E/i)).toBeInTheDocument();
  });
});
