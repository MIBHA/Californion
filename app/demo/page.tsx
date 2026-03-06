import Link from "next/link";
import { Calendar, Clock, Users, ArrowRight, CheckCircle } from "lucide-react";

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Nav */}
            <nav className="border-b border-border-subtle">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <Calendar className="h-6 w-6" />
                            <span className="text-xl font-semibold tracking-tight">Californion</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Sign In
                            </Link>
                            <Link href="/signup" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity">
                                Get Started Free
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-sm font-medium mb-4">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Live Demo
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                        See Californion in action
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Experience how easy scheduling can be. This is what your booking page looks like to your clients.
                    </p>
                </div>

                {/* Demo Booking Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Profile Card */}
                    <div className="border border-border-subtle rounded-xl p-6">
                        <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4 text-2xl font-bold">
                            JD
                        </div>
                        <h2 className="text-xl font-semibold">Jane Doe</h2>
                        <p className="text-muted-foreground text-sm mt-1">Product Designer · San Francisco, CA</p>

                        <div className="mt-6 space-y-3">
                            {[
                                { title: "15 Minute Chat", duration: "15 min", color: "#6366f1" },
                                { title: "Product Demo", duration: "30 min", color: "#0ea5e9" },
                                { title: "Strategy Session", duration: "60 min", color: "#10b981" },
                            ].map((et) => (
                                <div key={et.title} className="flex items-center justify-between p-3 border border-border-subtle rounded-lg hover:border-border cursor-pointer transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: et.color }} />
                                        <div>
                                            <p className="text-sm font-medium">{et.title}</p>
                                            <p className="text-xs text-muted-foreground">{et.duration}</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Calendar Demo */}
                    <div className="lg:col-span-2 border border-border-subtle rounded-xl p-6">
                        <h3 className="font-semibold mb-4">Select a date & time</h3>

                        {/* Simple Calendar Preview */}
                        <div className="grid grid-cols-7 gap-1 mb-6">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                                <div key={d} className="text-center text-xs text-muted-foreground py-2">{d}</div>
                            ))}
                            {Array.from({ length: 31 }, (_, i) => {
                                const day = i + 1;
                                const isToday = day === 6;
                                const isPast = day < 6;
                                const isSelected = day === 12;
                                return (
                                    <button
                                        key={day}
                                        disabled={isPast}
                                        className={`aspect-square flex items-center justify-center text-sm rounded-md transition-colors
                                            ${isSelected ? "bg-primary text-primary-foreground" : ""}
                                            ${isToday && !isSelected ? "border border-primary text-primary font-medium" : ""}
                                            ${!isPast && !isSelected && !isToday ? "hover:bg-accent" : ""}
                                            ${isPast ? "text-muted-foreground opacity-40 cursor-not-allowed" : ""}
                                        `}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Time Slots */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM"].map((t, i) => (
                                <button
                                    key={t}
                                    className={`py-2 px-3 text-sm border rounded-md transition-colors ${i === 2 ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-border hover:bg-accent"}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        { icon: Calendar, title: "Smart Availability", desc: "Auto-syncs with your calendar to prevent double bookings." },
                        { icon: Clock, title: "Buffer Times", desc: "Add time before and after events to avoid back-to-back meetings." },
                        { icon: Users, title: "Group Events", desc: "Let multiple people book the same time slot with seat limits." },
                    ].map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="border border-border-subtle rounded-lg p-5">
                            <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center mb-3">
                                <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-semibold mb-1">{title}</h3>
                            <p className="text-sm text-muted-foreground">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center border border-border-subtle rounded-xl p-12 bg-accent/30">
                    <h2 className="text-3xl font-bold mb-3">Ready to get started?</h2>
                    <p className="text-muted-foreground mb-6">Create your free account and set up your first event type in minutes.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-opacity">
                            Start for free
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link href="/dashboard" className="inline-flex items-center justify-center px-6 py-3 border border-border bg-background rounded-md font-medium hover:bg-accent transition-colors">
                            View Dashboard Demo
                        </Link>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                        {["No credit card required", "Free forever", "Open source"].map((f) => (
                            <span key={f} className="flex items-center gap-1">
                                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                                {f}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
