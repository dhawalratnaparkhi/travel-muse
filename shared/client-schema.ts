import { z } from "zod";

/**
 * CLIENT-SAFE SCHEMAS
 * Only Zod + types
 * NO drizzle, NO database code
 */

/* Customized Tour */
export const customizedTourSchema = z.object({
  days: z.number().min(1),
  hotelTier: z.string(),
  travelers: z.number().min(1),
});

export type CustomizedTourInput = z.infer<
  typeof customizedTourSchema
>;

/* Group Tour Booking */
export const groupTourBookingSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  seats: z.number().min(1),
});

export type GroupTourBookingInput = z.infer<
  typeof groupTourBookingSchema
>;

/* Admin Login / Forms */
export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AdminLoginInput = z.infer<
  typeof adminLoginSchema
>;
