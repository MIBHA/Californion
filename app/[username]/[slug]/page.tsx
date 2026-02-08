import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { BookingCalendar } from "@/components/booking/booking-calendar";
import { Calendar } from "lucide-react";

interface BookingPageProps {
    params: {
        username: string;
        slug: string;
    };
}

export default async function BookingPage({ params }: BookingPageProps) {
    const { username, slug } = params;

    // Find user by username
    const user = await prisma.user.findUnique({
        where: { username },
        include: {
            availability: true,
        },
    });

    if (!user) {
        notFound();
    }

    // Find event type by slug
    const eventType = await prisma.eventType.findUnique({
        where: {
            userId_slug: {
                userId: user.id,
                slug,
            },
        },
    });

    if (!eventType || eventType.hidden) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border-subtle">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span className="font-semibold">Californion</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Booking Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Event Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center text-lg font-semibold">
                                {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{user.name || "User"}</p>
                                <h1 className="text-2xl font-bold tracking-tight">{eventType.title}</h1>
                            </div>
                        </div>

                        {eventType.description && (
                            <p className="text-muted-foreground mb-6">{eventType.description}</p>
                        )}

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{eventType.length} minutes</span>
                            </div>
                        </div>
                    </div>

                    {/* Calendar & Time Slots */}
                    <div className="lg:col-span-3">
                        <BookingCalendar
                            eventType={eventType}
                            userAvailability={user.availability}
                            userTimezone={user.timezone}
                        />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border-subtle mt-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-sm text-muted-foreground">
                        Powered by{" "}
                        <a href="/" className="font-medium hover:text-foreground transition-colors">
                            Californion
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
