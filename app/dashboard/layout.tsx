import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";

// For local development without configured OAuth, use a demo user
const DEMO_USER: { id: string; name: string; email: string; image: string | null } = {
    id: "demo",
    name: "Demo User",
    email: "demo@californion.app",
    image: null,
};

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let sessionUser = DEMO_USER;

    // Try to get real session if auth is configured
    try {
        const { auth } = await import("@/lib/auth");
        const session = await auth();
        if (session?.user) {
            sessionUser = {
                id: session.user.id ?? "demo",
                name: session.user.name ?? "User",
                email: session.user.email ?? "",
                image: session.user.image ?? null,
            };
        }
    } catch {
        // Auth not configured — use demo user
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                {/* Sidebar */}
                <DashboardSidebar user={sessionUser} />

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Topbar */}
                    <DashboardTopbar user={sessionUser} />

                    {/* Page Content */}
                    <main className="flex-1 p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
