import { z } from "zod";

/* Example schemas used by frontend */
export const customizedTourSchema = z.object({
  days: z.number(),
  hotelTier: z.string(),
  travelers: z.number(),
});

export type CustomizedTour = z.infer<typeof customizedTourSchema>;
