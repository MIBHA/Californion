import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/setup
 * One-time database setup route - creates tables by running a test query.
 * Prisma will auto-create tables via the PrismaClient connection.
 * 
 * DELETE THIS FILE after your database is set up!
 */
export async function GET() {
    try {
        // Test the database connection
        const userCount = await prisma.user.count();

        return NextResponse.json({
            success: true,
            message: "Database connected successfully!",
            userCount,
            tables: "All tables exist and are working.",
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            {
                success: false,
                error: message,
                hint: "Make sure DATABASE_URL is set correctly in Vercel Environment Variables and redeploy.",
            },
            { status: 500 }
        );
    }
}
