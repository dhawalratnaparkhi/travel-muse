import { z } from "zod";

/**
 * CLIENT-SAFE ROUTES & VALIDATION
 * No backend logic
 * No database
 */

export const createInquiryRoute = {
  path: "/api/inquiries",
  body: z.object({
    destination: z.string(),
    duration: z.number(),
    adults: z.number(),
    children: z.number(),
    budget: z.string(),
    hotelPreference: z.string().optional(),
    transportPreference: z.string().optional(),
    startDate: z.string().optional(),
    specialRequirements: z.string().optional(),
  }),
};

export const createBookingRoute = {
  path: "/api/bookings",
  body: z.object({
    tourId: z.number(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    travelers: z.number(),
    message: z.string().optional(),
  }),
};
