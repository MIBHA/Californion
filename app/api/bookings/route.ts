import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createBookingSchema } from "@/lib/validations";
import dayjs from "dayjs";

/**
 * POST /api/bookings
 * Create a new booking
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = createBookingSchema.parse(body);

        // Check if event type exists
        const eventType = await prisma.eventType.findUnique({
            where: { id: validatedData.eventTypeId },
            include: { user: true },
        });

        if (!eventType) {
            return NextResponse.json({ error: "Event type not found" }, { status: 404 });
        }

        // Check for conflicts
        const existingBooking = await prisma.booking.findFirst({
            where: {
                userId: eventType.userId,
                status: {
                    in: ["PENDING", "ACCEPTED"],
                },
                OR: [
                    {
                        AND: [
                            { startTime: { lte: validatedData.startTime } },
                            { endTime: { gt: validatedData.startTime } },
                        ],
                    },
                    {
                        AND: [
                            { startTime: { lt: validatedData.endTime } },
                            { endTime: { gte: validatedData.endTime } },
                        ],
                    },
                ],
            },
        });

        if (existingBooking) {
            return NextResponse.json(
                { error: "Time slot is no longer available" },
                { status: 409 }
            );
        }

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                userId: eventType.userId,
                eventTypeId: validatedData.eventTypeId,
                attendeeName: validatedData.attendeeName,
                attendeeEmail: validatedData.attendeeEmail,
                attendeeNotes: validatedData.attendeeNotes,
                attendeeTimezone: validatedData.attendeeTimezone,
                startTime: validatedData.startTime,
                endTime: validatedData.endTime,
                status: "ACCEPTED",
            },
            include: {
                eventType: true,
                user: true,
            },
        });

        // TODO: Send confirmation email

        return NextResponse.json({ booking }, { status: 201 });
    } catch (error) {
        console.error("Booking API error:", error);

        if (error instanceof Error && error.name === "ZodError") {
            return NextResponse.json(
                { error: "Invalid input data" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * GET /api/bookings
 * Get user's bookings
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "Missing userId parameter" },
                { status: 400 }
            );
        }

        const bookings = await prisma.booking.findMany({
            where: { userId },
            include: {
                eventType: true,
            },
            orderBy: { startTime: "desc" },
        });

        return NextResponse.json({ bookings });
    } catch (error) {
        console.error("Bookings GET error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
