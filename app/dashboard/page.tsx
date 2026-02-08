import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Calendar, Clock, Users } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    // Fetch user's event types and recent bookings
    const [eventTypes, bookings] = await Promise.all([
        prisma.eventType.findMany({
            where: { userId: session.user.id },
            orderBy: { position: "asc" },
        }),
        prisma.booking.findMany({
            where: { userId: session.user.id },
            include: { eventType: true },
            orderBy: { startTime: "desc" },
            take: 5,
        }),
    ]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your events and bookings
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-border-subtle rounded-lg p-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Event Types</p>
                            <p className="text-2xl font-bold">{eventTypes.length}</p>
                        </div>
                    </div>
                </div>

                <div className="border border-border-subtle rounded-lg p-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                            <Clock className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Bookings</p>
                            <p className="text-2xl font-bold">{bookings.length}</p>
                        </div>
                    </div>
                </div>

                <div className="border border-border-subtle rounded-lg p-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">This Month</p>
                            <p className="text-2xl font-bold">0</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Types */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Event Types</h2>
                    <a
                        href="/dashboard/event-types/new"
                        className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
                    >
                        New Event Type
                    </a>
                </div>

                {eventTypes.length === 0 ? (
                    <div className="border border-border-subtle border-dashed rounded-lg p-12 text-center">
                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No event types yet</h3>
                        <p className="text-muted-foreground mb-6">
                            Create your first event type to start accepting bookings
                        </p>
                        <a
                            href="/dashboard/event-types/new"
                            className="inline-flex px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
                        >
                            Create Event Type
                        </a>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {eventTypes.map((eventType) => (
                            <div
                                key={eventType.id}
                                className="border border-border-subtle rounded-lg p-4 hover:border-border transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="h-3 w-3 rounded-full"
                                            style={{ backgroundColor: eventType.color }}
                                        />
                                        <div>
                                            <h3 className="font-medium">{eventType.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {eventType.length} min • /{eventType.slug}
                                            </p>
                                        </div>
                                    </div>
                                    <a
                                        href={`/dashboard/event-types/${eventType.id}`}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Edit
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Recent Bookings */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
                {bookings.length === 0 ? (
                    <div className="border border-border-subtle rounded-lg p-8 text-center">
                        <p className="text-muted-foreground">No bookings yet</p>
                    </div>
                ) : (
                    <div className="border border-border-subtle rounded-lg divide-y divide-border-subtle">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{booking.attendeeName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.eventType.title} •{" "}
                                            {new Date(booking.startTime).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-2 py-1 text-xs font-medium rounded ${booking.status === "ACCEPTED"
                                                ? "bg-green-100 text-green-800"
                                                : booking.status === "PENDING"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
