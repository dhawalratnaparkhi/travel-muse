import { z } from 'zod';
import { insertTourSchema, insertInquirySchema, insertBookingSchema, tours, inquiries, bookings } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  tours: {
    list: {
      method: 'GET' as const,
      path: '/api/tours',
      responses: {
        200: z.array(z.custom<typeof tours.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/tours/:id',
      responses: {
        200: z.custom<typeof tours.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/tours',
      input: insertTourSchema,
      responses: {
        201: z.custom<typeof tours.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/tours/:id',
      input: insertTourSchema.partial(),
      responses: {
        200: z.custom<typeof tours.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/tours/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
  },
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries',
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof inquiries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/inquiries',
      responses: {
        200: z.array(z.custom<typeof inquiries.$inferSelect>()),
        401: errorSchemas.unauthorized,
      },
    },
  },
  bookings: {
    create: {
      method: 'POST' as const,
      path: '/api/bookings',
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/bookings',
      responses: {
        200: z.array(z.custom<typeof bookings.$inferSelect>()),
        401: errorSchemas.unauthorized,
      },
    },
  },
  auth: {
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: z.object({
          id: z.number(),
          username: z.string(),
          isAdmin: z.boolean(),
        }).nullable(),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type Tour = z.infer<typeof api.tours.get.responses[200]>;
export type Inquiry = z.infer<typeof api.inquiries.create.responses[201]>;
export type Booking = z.infer<typeof api.bookings.create.responses[201]>;
