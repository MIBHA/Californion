/**
 * Californion - Availability Calculation Engine
 * 
 * Core algorithm for calculating available time slots based on:
 * - User-defined working hours
 * - Existing bookings
 * - Event type configuration (duration, buffers)
 * - Timezone conversions
 */

import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

// ============================================
// Types
// ============================================

export interface WorkingHours {
  days: number[]; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export interface ExistingBooking {
  startTime: Date;
  endTime: Date;
}

export interface EventTypeConfig {
  length: number; // Duration in minutes
  beforeBuffer?: number; // Minutes before
  afterBuffer?: number; // Minutes after
  slotInterval?: number; // Slot intervals (default: event length)
  minimumBookingNotice?: number; // Minutes in advance
}

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
}

export interface AvailabilityInput {
  date: Date; // Target date to check availability
  workingHours: WorkingHours[];
  existingBookings: ExistingBooking[];
  eventTypeConfig: EventTypeConfig;
  userTimezone: string;
  targetTimezone?: string; // Timezone for returned slots (defaults to userTimezone)
}

// ============================================
// Core Availability Algorithm
// ============================================

/**
 * Calculate available time slots for a given date
 */
export function calculateAvailability(input: AvailabilityInput): TimeSlot[] {
  const {
    date,
    workingHours,
    existingBookings,
    eventTypeConfig,
    userTimezone,
    targetTimezone = userTimezone,
  } = input;

  // Convert input date to user's timezone
  const targetDate = dayjs(date).tz(userTimezone);
  const dayOfWeek = targetDate.day();

  // Filter working hours for this day of week
  const applicableHours = workingHours.filter((wh) =>
    wh.days.includes(dayOfWeek)
  );

  if (applicableHours.length === 0) {
    return []; // No working hours defined for this day
  }

  // Generate all possible slots
  const allSlots: TimeSlot[] = [];

  for (const hours of applicableHours) {
    const slots = generateSlotsForWorkingHours(
      targetDate,
      hours,
      eventTypeConfig,
      userTimezone
    );
    allSlots.push(...slots);
  }

  // Filter out slots that conflict with existing bookings
  const availableSlots = filterConflictingSlots(
    allSlots,
    existingBookings,
    eventTypeConfig
  );

  // Filter out slots that don't meet minimum booking notice
  const futureSlots = filterPastSlots(
    availableSlots,
    eventTypeConfig.minimumBookingNotice || 0,
    userTimezone
  );

  // Convert slots to target timezone if different
  if (targetTimezone !== userTimezone) {
    return futureSlots.map((slot) => ({
      start: dayjs(slot.start).tz(targetTimezone).toDate(),
      end: dayjs(slot.end).tz(targetTimezone).toDate(),
      available: slot.available,
    }));
  }

  return futureSlots;
}

/**
 * Generate time slots for a specific working hours block
 */
function generateSlotsForWorkingHours(
  date: Dayjs,
  workingHours: WorkingHours,
  eventConfig: EventTypeConfig,
  timezone: string
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  
  // Parse start and end times
  const [startHour, startMinute] = workingHours.startTime.split(':').map(Number);
  const [endHour, endMinute] = workingHours.endTime.split(':').map(Number);

  // Create start and end datetime objects
  let currentSlot = date
    .hour(startHour)
    .minute(startMinute)
    .second(0)
    .millisecond(0);

  const endTime = date
    .hour(endHour)
    .minute(endMinute)
    .second(0)
    .millisecond(0);

  const slotInterval = eventConfig.slotInterval || eventConfig.length;
  const eventDuration = eventConfig.length;

  // Generate slots
  while (currentSlot.isBefore(endTime)) {
    const slotEnd = currentSlot.add(eventDuration, 'minute');

    // Only add slot if it fits within working hours
    if (slotEnd.isBefore(endTime) || slotEnd.isSame(endTime)) {
      slots.push({
        start: currentSlot.toDate(),
        end: slotEnd.toDate(),
        available: true,
      });
    }

    currentSlot = currentSlot.add(slotInterval, 'minute');
  }

  return slots;
}

/**
 * Filter out slots that conflict with existing bookings
 */
function filterConflictingSlots(
  slots: TimeSlot[],
  existingBookings: ExistingBooking[],
  eventConfig: EventTypeConfig
): TimeSlot[] {
  const beforeBuffer = eventConfig.beforeBuffer || 0;
  const afterBuffer = eventConfig.afterBuffer || 0;

  return slots.map((slot) => {
    // Check if this slot conflicts with any booking (including buffers)
    const hasConflict = existingBookings.some((booking) => {
      const bookingStart = dayjs(booking.startTime).subtract(
        beforeBuffer,
        'minute'
      );
      const bookingEnd = dayjs(booking.endTime).add(afterBuffer, 'minute');

      const slotStart = dayjs(slot.start);
      const slotEnd = dayjs(slot.end);

      // Check for overlap
      return (
        slotStart.isBetween(bookingStart, bookingEnd, null, '[)') ||
        slotEnd.isBetween(bookingStart, bookingEnd, null, '(]') ||
        (slotStart.isSameOrBefore(bookingStart) &&
          slotEnd.isSameOrAfter(bookingEnd))
      );
    });

    return {
      ...slot,
      available: !hasConflict,
    };
  });
}

/**
 * Filter out slots that are in the past or don't meet minimum booking notice
 */
function filterPastSlots(
  slots: TimeSlot[],
  minimumNoticeMinutes: number,
  timezone: string
): TimeSlot[] {
  const now = dayjs().tz(timezone);
  const minimumStartTime = now.add(minimumNoticeMinutes, 'minute');

  return slots.filter((slot) => {
    return dayjs(slot.start).isAfter(minimumStartTime);
  });
}

// ============================================
// Helper Functions
// ============================================

/**
 * Get available dates for a month
 */
export function getAvailableDatesInMonth(
  year: number,
  month: number, // 0-11
  workingHours: WorkingHours[],
  userTimezone: string
): Date[] {
  const dates: Date[] = [];
  const startOfMonth = dayjs()
    .tz(userTimezone)
    .year(year)
    .month(month)
    .startOf('month');
  const endOfMonth = startOfMonth.endOf('month');

  let currentDate = startOfMonth;

  while (
    currentDate.isBefore(endOfMonth) ||
    currentDate.isSame(endOfMonth, 'day')
  ) {
    const dayOfWeek = currentDate.day();

    // Check if there are working hours for this day
    const hasWorkingHours = workingHours.some((wh) =>
      wh.days.includes(dayOfWeek)
    );

    if (hasWorkingHours) {
      dates.push(currentDate.toDate());
    }

    currentDate = currentDate.add(1, 'day');
  }

  return dates;
}

/**
 * Format time slot for display
 */
export function formatTimeSlot(
  slot: TimeSlot,
  timezone: string,
  format: '12' | '24' = '12'
): string {
  const timeFormat = format === '12' ? 'h:mm A' : 'HH:mm';
  const start = dayjs(slot.start).tz(timezone).format(timeFormat);
  const end = dayjs(slot.end).tz(timezone).format(timeFormat);
  return `${start} - ${end}`;
}

/**
 * Check if a specific time slot is available
 */
export function isSlotAvailable(
  slotStart: Date,
  eventConfig: EventTypeConfig,
  existingBookings: ExistingBooking[],
  userTimezone: string
): boolean {
  const slotEnd = dayjs(slotStart)
    .tz(userTimezone)
    .add(eventConfig.length, 'minute')
    .toDate();

  const slot: TimeSlot = {
    start: slotStart,
    end: slotEnd,
    available: true,
  };

  const filtered = filterConflictingSlots([slot], existingBookings, eventConfig);
  return filtered[0]?.available || false;
}
