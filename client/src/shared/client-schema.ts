import { z } from "zod";

// =======================
// FRONTEND-SAFE SCHEMAS
// =======================

// Custom Tour
export const customizedTourSchema = z.object({
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

export type CustomizedTourInput = z.infer<
  typeof customizedTourSchema
>;

// Group Tour Booking
export const groupTourBookingSchema = z.object({
  tourId: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  travelers: z.number().min(1),
  message: z.string().optional(),
});

export type GroupTourBookingInput = z.infer<
  typeof groupTourBookingSchema
>;

// Admin Login
export const adminLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type AdminLoginInput = z.infer<
  typeof adminLoginSchema
>;
// Inquiry (used by useCreateInquiry & forms)
export const insertInquirySchema = z.object({
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

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
