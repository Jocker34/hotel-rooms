import { z } from 'zod';

export const roomAvailabilitySchema = z.object({
  availabilityStatus: z.enum(['onRequest', 'available', 'soldOut', 'error']),
  price: z.object({
    value: z.number(),
    currencyCode: z.string(),
  }),
});

export type RoomAvailability = z.infer<typeof roomAvailabilitySchema>;
