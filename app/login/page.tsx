"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Github, Mail, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [magicLinkSent, setMagicLinkSent] = useState(false);
    const [mode, setMode] = useState<"password" | "magic">("magic");

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate sending magic link
        await new Promise((r) => setTimeout(r, 1200));
        setMagicLinkSent(true);
        setLoading(false);
    };

    const handlePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        setLoading(false);
        alert("Auth providers (Google/GitHub) need to be configured in .env to enable login.");
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <Calendar className="h-7 w-7" />
                    <span className="text-2xl font-semibold tracking-tight">Californion</span>
                </div>

                <div className="border border-border-subtle rounded-xl p-8 bg-background shadow-sm">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                        <p className="text-sm text-muted-foreground mt-1">Sign in to your account to continue</p>
                    </div>

                    {magicLinkSent ? (
                        <div className="text-center py-6">
                            <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-6 w-6" />
                            </div>
                            <h2 className="text-lg font-semibold mb-2">Check your email</h2>
                            <p className="text-sm text-muted-foreground">
                                We sent a magic link to <strong>{email}</strong>. Click the link to sign in.
                            </p>
                            <button
                                onClick={() => setMagicLinkSent(false)}
                                className="mt-4 text-sm text-muted-foreground hover:text-foreground underline"
                            >
                                Use a different email
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* OAuth Buttons */}
                            <div className="space-y-2 mb-6">
                                <button
                                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium"
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Continue with Google
                                </button>
                                <button
                                    onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-border rounded-md hover:bg-accent transition-colors text-sm font-medium"
                                >
                                    <Github className="h-4 w-4" />
                                    Continue with GitHub
                                </button>
                            </div>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border-subtle" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                                </div>
                            </div>

                            {/* Mode Tabs */}
                            <div className="flex rounded-md border border-border-subtle mb-4 p-0.5 bg-accent">
                                <button
                                    onClick={() => setMode("magic")}
                                    className={`flex-1 py-1.5 text-sm rounded transition-colors ${mode === "magic" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
                                >
                                    Magic Link
                                </button>
                                <button
                                    onClick={() => setMode("password")}
                                    className={`flex-1 py-1.5 text-sm rounded transition-colors ${mode === "password" ? "bg-background shadow-sm font-medium" : "text-muted-foreground"}`}
                                >
                                    Password
                                </button>
                            </div>

                            {mode === "magic" ? (
                                <form onSubmit={handleMagicLink} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-10 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                                    >
                                        {loading ? "Sending..." : "Send Magic Link"}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handlePassword} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label className="text-sm font-medium">Password</label>
                                            <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-10 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                                    >
                                        {loading ? "Signing in..." : "Sign In"}
                                    </button>
                                </form>
                            )}
                        </>
                    )}

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-medium text-foreground hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
