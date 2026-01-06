import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// =======================
// DATABASE TABLES (SERVER ONLY)
// =======================

// Users (Admin)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Group Tours
export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  destination: text("destination").notNull(),
  price: integer("price").notNull(),
  duration: text("duration").notNull(),
  startDate: timestamp("start_date").notNull(),
  imageUrl: text("image_url").notNull(),
  isActive: boolean("is_active").default(true),
  itinerary: jsonb("itinerary").$type<
    { day: number; title: string; description: string }[]
  >(),
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
  duration: integer("duration").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").default(0),
  budget: text("budget").notNull(),
  hotelPreference: text("hotel_preference"),
  transportPreference: text("transport_preference"),
  startDate: text("start_date"),
  specialRequirements: text("special_requirements"),
  status: text("status").default("pending"),
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
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// =======================
// INSERT SCHEMAS (SERVER ONLY)
// =======================

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertTourSchema = createInsertSchema(tours).omit({
  id: true,
  createdAt: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true,
});
