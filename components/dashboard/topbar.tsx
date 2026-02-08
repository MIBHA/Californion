"use client";

import { Menu, Search, Bell } from "lucide-react";
import { useState } from "react";

interface DashboardTopbarProps {
    user: {
        name?: string | null;
        email?: string | null;
    };
}

export function DashboardTopbar({ user }: DashboardTopbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="h-16 border-b border-border-subtle bg-background sticky top-0 z-10">
            <div className="h-full px-4 lg:px-8 flex items-center justify-between">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
                >
                    <Menu className="h-5 w-5" />
                </button>

                {/* Search */}
                <div className="flex-1 max-w-md hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search... (⌘K)"
                            className="w-full pl-10 pr-4 py-2 bg-accent border border-border-subtle rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button className="p-2 text-muted-foreground hover:text-foreground relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                    </button>

                    {/* Mobile User Menu */}
                    <div className="lg:hidden">
                        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-sm font-medium">
                            {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
