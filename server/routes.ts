import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // Tours
  app.get(api.tours.list.path, async (req, res) => {
    const tours = await storage.getTours();
    res.json(tours);
  });

  app.get(api.tours.get.path, async (req, res) => {
    const tour = await storage.getTour(Number(req.params.id));
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  });

  app.post(api.tours.create.path, async (req, res) => {
    if (!req.isAuthenticated?.()) return res.status(401).json({ message: "Unauthorized" });
    // Ideally check if user is admin
    try {
      const input = api.tours.create.input.parse(req.body);
      const tour = await storage.createTour(input);
      res.status(201).json(tour);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.put(api.tours.update.path, async (req, res) => {
    if (!req.isAuthenticated?.()) return res.status(401).json({ message: "Unauthorized" });
    try {
      const input = api.tours.update.input.parse(req.body);
      const tour = await storage.updateTour(Number(req.params.id), input);
      if (!tour) return res.status(404).json({ message: "Tour not found" });
      res.json(tour);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.delete(api.tours.delete.path, async (req, res) => {
    if (!req.isAuthenticated?.()) return res.status(401).json({ message: "Unauthorized" });
    await storage.deleteTour(Number(req.params.id));
    res.status(204).send();
  });

  // Inquiries
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.inquiries.list.path, async (req, res) => {
    if (!req.isAuthenticated?.()) return res.status(401).json({ message: "Unauthorized" });
    const inquiries = await storage.getInquiries();
    res.json(inquiries);
  });

  // Bookings
  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const booking = await storage.createBooking(input);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.bookings.list.path, async (req, res) => {
    if (!req.isAuthenticated?.()) return res.status(401).json({ message: "Unauthorized" });
    const bookings = await storage.getBookings();
    res.json(bookings);
  });

  // Auth Status
  app.get(api.auth.me.path, (req, res) => {
    if (req.isAuthenticated?.()) {
      return res.json(req.user);
    }
    res.json(null);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingTours = await storage.getTours();
  if (existingTours.length === 0) {
    await storage.createTour({
      title: "Himalayan Adventure",
      description: "Experience the breathtaking views of the Himalayas with this 7-day trek.",
      destination: "Manali, India",
      price: 49999, // 499.99
      duration: "7 Days / 6 Nights",
      startDate: new Date("2024-06-15"),
      imageUrl: "https://images.unsplash.com/photo-1486911278844-a81c5267e227",
      itinerary: [
        { day: 1, title: "Arrival", description: "Arrive in Manali and transfer to hotel." },
        { day: 2, title: "Acclimatization", description: "Local sightseeing and rest." },
        // ...
      ],
      whatsIncluded: ["Hotel", "Meals", "Guide"],
      whatsNotIncluded: ["Flights", "Personal Expenses"],
      isActive: true
    });

    await storage.createTour({
      title: "Kerala Backwaters",
      description: "Relax in the serene backwaters of Kerala on a luxury houseboat.",
      destination: "Alleppey, India",
      price: 35000,
      duration: "5 Days / 4 Nights",
      startDate: new Date("2024-05-20"),
      imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
      itinerary: [],
      whatsIncluded: ["Houseboat", "All Meals"],
      whatsNotIncluded: ["Flights"],
      isActive: true
    });
  }
}
