import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Users (for Admin access)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(), // Replit username
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Group Tours
export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  destination: text("destination").notNull(),
  price: integer("price").notNull(), // Stored in lowest unit (e.g. cents or whole currency)
  duration: text("duration").notNull(), // e.g. "5 Days / 4 Nights"
  startDate: timestamp("start_date").notNull(),
  imageUrl: text("image_url").notNull(),
  isActive: boolean("is_active").default(true),
  itinerary: jsonb("itinerary").$type<{day: number, title: string, description: string}[]>(), // Structured itinerary
  whatsIncluded: text("whats_included").array(),
  whatsNotIncluded: text("whats_not_included").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Custom Tour Inquiries
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  destination: text("destination").notNull(),
  duration: integer("duration").notNull(), // Number of days
  adults: integer("adults").notNull(),
  children: integer("children").default(0),
  budget: text("budget").notNull(), // Standard, Premium, Luxury
  hotelPreference: text("hotel_preference"), // 3 Star, 4 Star, etc.
  transportPreference: text("transport_preference"), // Flight, Train, Cab
  startDate: text("start_date"), // Can be text for "Flexible" or specific date
  specialRequirements: text("special_requirements"),
  status: text("status").default("pending"), // pending, contacted, closed
  createdAt: timestamp("created_at").defaultNow(),
});

// Group Tour Bookings
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  tourId: integer("tour_id").references(() => tours.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  travelers: integer("travelers").notNull(),
  message: text("message"),
  status: text("status").default("pending"), // pending, confirmed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertTourSchema = createInsertSchema(tours).omit({ id: true, createdAt: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true, status: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true, status: true });

// === TYPES ===

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Tour = typeof tours.$inferSelect;
export type InsertTour = z.infer<typeof insertTourSchema>;

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
