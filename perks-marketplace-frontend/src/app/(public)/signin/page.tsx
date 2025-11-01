"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, TrendingUp, Gift, Zap, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
// Mock useTheme hook for demo

export default function SignInPage() {
    const { theme, themeName, toggleTheme } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign in:", { email, password, rememberMe });
    };

    const perksStats = [
        { icon: Gift, label: "500+ Exclusive Perks", color: theme.colors.primary },
        { icon: TrendingUp, label: "$2M+ Value Unlocked", color: theme.colors.secondary },
        { icon: Zap, label: "Instant Access", color: theme.colors.accent },
    ];

    return (
        <>
            <style>{`
        .gradient-bg {
          background: linear-gradient(135deg, ${theme.colors.primary}15 0%, ${theme.colors.secondary}15 100%);
        }

        .floating-card {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(-10px) rotate(-2deg); }
        }

        .input-glow:focus {
          box-shadow: 0 0 0 3px ${theme.colors.primary}30;
        }

        .perk-icon {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>

            <div style={{ backgroundColor: theme.colors.background, minHeight: "100vh", display: "flex" }}>
                {/* Left Side - Sign In Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
                    {/* Theme Toggle */}
                    

                    <div className="w-full max-w-md">
                        {/* Logo/Brand */}
                        <div className="mb-8">
                            <div className="inline-flex items-center space-x-2 mb-4">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: theme.colors.primary }}
                                >
                                    <Sparkles className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold" style={{ color: theme.colors.foreground }}>
                                    PerksMarket
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: theme.colors.foreground }}>
                                Welcome Back
                            </h1>
                            <p style={{ color: theme.colors.foreground, opacity: 0.6 }}>
                                Sign in to access your exclusive perks
                            </p>
                        </div>

                        {/* Sign In Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.foreground }}>
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5"
                                        style={{ color: theme.colors.primary, opacity: 0.5 }}
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full pl-12 pr-4 py-3 rounded-lg outline-none transition-all input-glow"
                                        style={{
                                            backgroundColor: themeName === "dark" ? theme.colors.card : `${theme.colors.primary}08`,
                                            color: theme.colors.foreground,
                                            border: `1px solid ${theme.colors.primary}30`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.foreground }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5"
                                        style={{ color: theme.colors.primary, opacity: 0.5 }}
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-12 pr-12 py-3 rounded-lg outline-none transition-all input-glow"
                                        style={{
                                            backgroundColor: themeName === "dark" ? theme.colors.card : `${theme.colors.primary}08`,
                                            color: theme.colors.foreground,
                                            border: `1px solid ${theme.colors.primary}30`,
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                        style={{ color: theme.colors.primary, opacity: 0.5 }}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded cursor-pointer"
                                        style={{ accentColor: theme.colors.primary }}
                                    />
                                    <span className="text-sm" style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                                        Remember me
                                    </span>
                                </label>
                                <a
                                    href="#"
                                    className="text-sm font-medium hover:underline"
                                    style={{ color: theme.colors.primary }}
                                >
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg text-white font-medium flex items-center justify-center space-x-2 transition-all hover:shadow-lg hover:scale-[1.02]"
                                style={{ backgroundColor: theme.colors.primary }}
                            >
                                <span>Sign In</span>
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <p className="mt-6 text-center text-sm" style={{ color: theme.colors.foreground, opacity: 0.6 }}>
                            Don't have an account?{" "}
                            <a href="/signup" className="font-medium hover:underline" style={{ color: theme.colors.primary }}>
                                Sign up for free
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Side - Visual Content */}
                <div
                    className="hidden lg:flex w-1/2 items-center justify-center p-12 gradient-bg relative overflow-hidden"
                    style={{ backgroundColor: themeName === "dark" ? theme.colors.card : `${theme.colors.primary}10` }}
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20"
                        style={{ background: `radial-gradient(circle, ${theme.colors.primary} 0%, transparent 70%)` }} />
                    <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-20"
                        style={{ background: `radial-gradient(circle, ${theme.colors.secondary} 0%, transparent 70%)` }} />

                    <div className="relative z-10 max-w-lg">
                        <div className="mb-8">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: theme.colors.foreground }}>
                                Unlock Your
                                <br />
                                <span style={{
                                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}>
                                    Business Potential
                                </span>
                            </h2>
                            <p className="text-lg" style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                                Access exclusive deals and perks from the world's leading brands. Save thousands on the tools you need to grow.
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="space-y-4">
                            {perksStats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={index}
                                        className="floating-card flex items-center space-x-4 p-4 rounded-xl backdrop-blur-sm"
                                        style={{
                                            backgroundColor: themeName === "dark" ? `${theme.colors.background}80` : `${theme.colors.background}60`,
                                            border: `1px solid ${stat.color}30`,
                                            animationDelay: `${index * 0.5}s`,
                                        }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-lg flex items-center justify-center perk-icon"
                                            style={{ backgroundColor: `${stat.color}20` }}
                                        >
                                            <Icon className="h-6 w-6" style={{ color: stat.color }} />
                                        </div>
                                        <span className="font-semibold text-lg" style={{ color: theme.colors.foreground }}>
                                            {stat.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Testimonial */}
                        <div className="mt-8 p-6 rounded-xl backdrop-blur-sm"
                            style={{
                                backgroundColor: themeName === "dark" ? `${theme.colors.background}80` : `${theme.colors.background}60`,
                                border: `1px solid ${theme.colors.primary}30`,
                            }}>
                            <div className="flex items-center space-x-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Sparkles key={i} className="h-4 w-4" style={{ color: theme.colors.accent }} />
                                ))}
                            </div>
                            <p className="italic mb-2" style={{ color: theme.colors.foreground, opacity: 0.8 }}>
                                "PerksMarket saved us over $50K in our first year. The AWS credits alone were worth signing up!"
                            </p>
                            <p className="text-sm font-medium" style={{ color: theme.colors.foreground, opacity: 0.6 }}>
                                — Sarah Chen, Founder @ TechStartup
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}