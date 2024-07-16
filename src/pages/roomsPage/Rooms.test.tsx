import { render, screen, fireEvent } from '@test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Rooms } from './Rooms';
import { useRooms } from '@/hooks/useRooms';
import { Room } from '@/schemas/roomSchema';

vi.mock('@/hooks/useRooms');

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
    vi.clearAllMocks();
  });

  test('renders loading state', () => {
    mockUseRooms.mockReturnValueOnce({
      data: null,
      isPending: true,
      isError: false,
    } as any);

    render(<Rooms />);
    const skeletonElements = screen.getAllByTestId('skeleton');
    expect(skeletonElements.length).toBe(5);
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
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Rooms />
      </QueryClientProvider>
    );

    const select = screen.getByPlaceholderText('Sort by');
    fireEvent.click(select);
    fireEvent.click(screen.getByText('Name (A-Z)'));
    const sortedRooms = screen.getAllByText(/Room/i);
    expect(sortedRooms[0]).toHaveTextContent('Room A');
    expect(sortedRooms[1]).toHaveTextContent('Room B');
  });

  test('renders rooms and sorts by price (Low to High)', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Rooms />
      </QueryClientProvider>
    );
    const select = screen.getByPlaceholderText('Sort by');
    fireEvent.click(select);
    fireEvent.click(screen.getByText('Price (Low to High)'));
    const sortedRooms = await screen.findAllByText(/Room/i);
    expect(sortedRooms[0]).toHaveTextContent('Room A');
    expect(sortedRooms[1]).toHaveTextContent('Room D');
  });
});
