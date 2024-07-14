import { useQuery } from '@tanstack/react-query';
import { RoomAvailability } from '@/schemas/roomAvailability';

export const useRoom = (id: number, enabled: boolean) =>
  useQuery<RoomAvailability, Error>({
    queryKey: ['room', id],
    queryFn: async () => {
      const response = await fetch(`https://dcontent.inviacdn.net/shared/dev/test-api/room/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled,
  });
