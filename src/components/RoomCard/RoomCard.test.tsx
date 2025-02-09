import { render, screen, fireEvent } from '@test-utils';
import { RoomCard } from './RoomCard';
import { useRoom } from '@/hooks/useRoom';

vi.mock('@/hooks/useRoom');

const mockUseRoom = useRoom as jest.MockedFunction<typeof useRoom>;

describe('RoomCard component', () => {
  const roomData = {
    id: 1,
    name: 'Deluxe Room',
    price: {
      currencyCode: 'USD',
      value: 200,
    },
  };

  beforeEach(() => {
    mockUseRoom.mockReturnValue({
      refetch: vi.fn(() =>
        Promise.resolve({
          data: {
            id: roomData.id,
            name: roomData.name,
            price: { value: 180, currencyCode: 'USD' },
            availabilityStatus: 'available',
          },
        })
      ),
      isError: false,
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders RoomCard component', () => {
    render(<RoomCard {...roomData} />);
    const roomName = screen.getByText(/Deluxe Room/i);
    expect(roomName).toBeInTheDocument();
    const roomPrice = screen.getByText(/200/i);
    expect(roomPrice).toBeInTheDocument();
  });

  test('checks availability and updates price and status', async () => {
    render(<RoomCard {...roomData} />);
    const checkButton = screen.getByText(/Check/i);
    fireEvent.click(checkButton);

    const newPrice = await screen.findByText(/180/i);
    expect(newPrice).toBeInTheDocument();
    const statusBadge = screen.getByText(/available/i);
    expect(statusBadge).toBeInTheDocument();
  });

  test('logs room details when "Book now" button is clicked', async () => {
    console.log = vi.fn();
    render(<RoomCard {...roomData} />);
    const checkButton = screen.getByText(/Check/i);
    fireEvent.click(checkButton);

    await screen.findByText(/180/i);
    const bookButton = screen.getByText(/Book now/i);

    fireEvent.click(bookButton);
    expect(console.log).toHaveBeenCalledWith('Room Details:');
    expect(console.log).toHaveBeenCalledWith(`Room ID: ${roomData.id}`);
    expect(console.log).toHaveBeenCalledWith(`Room Name: ${roomData.name}`);
    expect(console.log).toHaveBeenCalledWith('Current Price: 180');
    expect(console.log).toHaveBeenCalledWith('Currency Code: USD');
    expect(console.log).toHaveBeenCalledWith('Availability Status: available');
  });

  test('displays error message when status is error', () => {
    mockUseRoom.mockReturnValueOnce({
      refetch: vi.fn(() =>
        Promise.resolve({
          data: {
            id: roomData.id,
            name: roomData.name,
            price: { value: 180, currencyCode: 'USD' },
            availabilityStatus: 'error',
          },
        })
      ),
      isError: true,
    } as any);

    render(<RoomCard {...roomData} />);
    const checkButton = screen.getByText(/Check/i);
    fireEvent.click(checkButton);

    const errorMessage = screen.getByText(/Something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
