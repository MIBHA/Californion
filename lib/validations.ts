/**
 * Zod Validation Schemas
 * Type-safe validation for forms and API endpoints
 */

import { z } from 'zod';

// ============================================
// Event Type Schemas
// ============================================

export const createEventTypeSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    slug: z
        .string()
        .min(1, 'Slug is required')
        .max(50)
        .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
    description: z.string().max(500).optional(),
    length: z.number().min(5).max(480), // 5 min to 8 hours
    beforeBuffer: z.number().min(0).max(120).default(0),
    afterBuffer: z.number().min(0).max(120).default(0),
    minimumBookingNotice: z.number().min(0).default(120),
    slotInterval: z.number().min(5).max(120).default(30),
    seatsPerTimeSlot: z.number().min(1).optional(),
    color: z.string().regex(/^#[0-9A-F]{6}$/i).default('#000000'),
    hidden: z.boolean().default(false),
});

export const updateEventTypeSchema = createEventTypeSchema.partial();

export type CreateEventTypeInput = z.infer<typeof createEventTypeSchema>;
export type UpdateEventTypeInput = z.infer<typeof updateEventTypeSchema>;

// ============================================
// Availability Schemas
// ============================================

export const availabilitySchema = z.object({
    days: z.array(z.number().min(0).max(6)),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    date: z.date().optional(),
});

export const createAvailabilitySchema = z.object({
    schedules: z.array(availabilitySchema).min(1),
});

export type AvailabilityInput = z.infer<typeof availabilitySchema>;
export type CreateAvailabilityInput = z.infer<typeof createAvailabilitySchema>;

// ============================================
// Booking Schemas
// ============================================

export const createBookingSchema = z.object({
    eventTypeId: z.string().cuid(),
    attendeeName: z.string().min(1, 'Name is required').max(100),
    attendeeEmail: z.string().email('Invalid email address'),
    attendeeNotes: z.string().max(500).optional(),
    attendeeTimezone: z.string().default('UTC'),
    startTime: z.date(),
    endTime: z.date(),
});

export const cancelBookingSchema = z.object({
    bookingId: z.string().cuid(),
    cancelReason: z.string().max(500).optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;

// ============================================
// User Profile Schemas
// ============================================

export const updateUserProfileSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    username: z
        .string()
        .min(3)
        .max(50)
        .regex(/^[a-z0-9-]+$/, 'Username must be lowercase alphanumeric with hyphens')
        .optional(),
    bio: z.string().max(500).optional(),
    timezone: z.string().optional(),
    weekStart: z.number().min(0).max(6).optional(),
    timeFormat: z.number().int().refine((val) => val === 12 || val === 24).optional(),
});

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
