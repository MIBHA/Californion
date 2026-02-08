import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="border-b border-border-subtle">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-6 w-6" />
                            <span className="text-xl font-semibold tracking-tight">Californion</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-20 sm:py-32">
                    <div className="text-center">
                        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
                            Scheduling
                            <br />
                            <span className="text-muted-foreground">Made Simple</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            Open-source scheduling infrastructure for absolutely everyone. Focus on meeting,
                            not making meetings.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-opacity"
                            >
                                Start for free
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <Link
                                href="/demo"
                                className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background text-foreground font-medium rounded-md hover:bg-accent transition-colors"
                            >
                                View demo
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="border border-border-subtle rounded-lg p-6 hover:border-border transition-colors">
                            <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Smart Scheduling</h3>
                            <p className="text-muted-foreground text-sm">
                                Intelligent availability detection with timezone support and calendar sync.
                            </p>
                        </div>

                        <div className="border border-border-subtle rounded-lg p-6 hover:border-border transition-colors">
                            <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Flexible Event Types</h3>
                            <p className="text-muted-foreground text-sm">
                                Create custom event types with durations, buffers, and booking rules.
                            </p>
                        </div>

                        <div className="border border-border-subtle rounded-lg p-6 hover:border-border transition-colors">
                            <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Calendar Integration</h3>
                            <p className="text-muted-foreground text-sm">
                                Connect Google Calendar, Outlook, and more to prevent double bookings.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border-subtle mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span className="font-semibold">Californion</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2026 Californion. Open source scheduling platform.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
