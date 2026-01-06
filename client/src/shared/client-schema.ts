import { z } from "zod";

// =======================
// FRONTEND FORM SCHEMAS
// =======================

// Custom Tour (frontend form)
export const customTourFormSchema = z.object({
  destination: z.string(),
  duration: z.number().min(1),
  adults: z.number().min(1),
  children: z.number().min(0),
  budget: z.string(),
  hotelPreference: z.string().optional(),
  transportPreference: z.string().optional(),
  startDate: z.string().optional(),
  specialRequirements: z.string().optional(),
});

export type CustomTourForm = z.infer<typeof customTourFormSchema>;

// Booking form (frontend)
export const bookingFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  travelers: z.number().min(1),
  message: z.string().optional(),
});

export type BookingForm = z.infer<typeof bookingFormSchema>;

// Admin login
export const adminLoginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type AdminLoginForm = z.infer<typeof adminLoginFormSchema>;
