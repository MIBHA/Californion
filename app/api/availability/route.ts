import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateAvailability } from "@/lib/availability";
import dayjs from "dayjs";

/**
 * GET /api/availability
 * Get available time slots for a specific date and event type
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const eventTypeId = searchParams.get("eventTypeId");
        const date = searchParams.get("date");
        const timezone = searchParams.get("timezone") || "UTC";

        if (!eventTypeId || !date) {
            return NextResponse.json(
                { error: "Missing required parameters" },
                { status: 400 }
            );
        }

        // Fetch event type with user availability
        const eventType = await prisma.eventType.findUnique({
            where: { id: eventTypeId },
            include: {
                user: {
                    include: {
                        availability: true,
                    },
                },
            },
        });

        if (!eventType) {
            return NextResponse.json({ error: "Event type not found" }, { status: 404 });
        }

        // Fetch existing bookings for this user on the selected date
        const startOfDay = dayjs(date).startOf("day").toDate();
        const endOfDay = dayjs(date).endOf("day").toDate();

        const existingBookings = await prisma.booking.findMany({
            where: {
                userId: eventType.userId,
                startTime: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                status: {
                    in: ["PENDING", "ACCEPTED"],
                },
            },
            select: {
                startTime: true,
                endTime: true,
            },
        });

        // Calculate availability
        const availableSlots = calculateAvailability({
            date: new Date(date),
            workingHours: eventType.user.availability.map((avail) => ({
                days: avail.days,
                startTime: avail.startTime,
                endTime: avail.endTime,
            })),
            existingBookings,
            eventTypeConfig: {
                length: eventType.length,
                beforeBuffer: eventType.beforeBuffer,
                afterBuffer: eventType.afterBuffer,
                slotInterval: eventType.slotInterval,
                minimumBookingNotice: eventType.minimumBookingNotice,
            },
            userTimezone: eventType.user.timezone,
            targetTimezone: timezone,
        });

        // Filter only available slots
        const slots = availableSlots
            .filter((slot) => slot.available)
            .map((slot) => ({
                start: slot.start.toISOString(),
                end: slot.end.toISOString(),
            }));

        return NextResponse.json({ slots });
    } catch (error) {
        console.error("Availability API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
