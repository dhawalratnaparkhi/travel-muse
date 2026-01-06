import { z } from "zod";

/**
 * CLIENT-SAFE API ROUTES
 * Used by frontend hooks only
 * No backend logic here
 */

export const routes = {
  tours: "/api/tours",
  inquiries: "/api/inquiries",
  bookings: "/api/bookings",
};

/**
 * Optional: request validation schemas
 */

export const inquirySchema = z.object({
  destination: z.string(),
  duration: z.number(),
  adults: z.number(),
  children: z.number().optional(),
  budget: z.string(),
  hotelPreference: z.string().optional(),
  transportPreference: z.string().optional(),
  startDate: z.string().optional(),
  specialRequirements: z.string().optional(),
});

export const bookingSchema = z.object({
  tourId: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  travelers: z.number(),
  message: z.string().optional(),
});
