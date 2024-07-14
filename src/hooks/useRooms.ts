import { useQuery } from '@tanstack/react-query';
import { roomsSchema, Rooms } from '../schemas/roomSchema';

const fetchRooms = async (): Promise<Rooms> => {
  const response = await fetch('https://dcontent.inviacdn.net/shared/dev/test-api/rooms');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  const parsedData = roomsSchema.parse(data);
  return parsedData;
};

export const useRooms = () => useQuery<Rooms, Error>({ queryKey: ['rooms'], queryFn: fetchRooms });
