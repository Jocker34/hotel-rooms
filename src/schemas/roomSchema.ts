import { z } from 'zod';

export const roomSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.object({
    value: z.number(),
    currencyCode: z.string(),
  }),
});

export const roomsSchema = z.array(roomSchema);

export type Rooms = z.infer<typeof roomsSchema>;
