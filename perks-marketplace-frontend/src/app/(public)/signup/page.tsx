"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, User, Building, CheckCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function SignUpPage() {
  const { theme, themeName } = useTheme();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = () => {
    console.log("Sign up:", { fullName, email, company, password, confirmPassword, agreeTerms });
  };

  const benefits = [
    { text: "Access to 500+ exclusive perks", checked: true },
    { text: "Save thousands on business tools", checked: true },
    { text: "Instant activation - no waiting", checked: true },
    { text: "Regular updates on new deals", checked: true },
    { text: "Priority customer support", checked: true },
    { text: "Free forever - no credit card required", checked: true },
  ];

  return (
    <>
      <style>{`
        .gradient-bg {
          background: linear-gradient(135deg, ${theme.colors.secondary}15 0%, ${theme.colors.primary}15 100%);
        }

        .benefit-item {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .input-glow:focus {
          box-shadow: 0 0 0 3px ${theme.colors.primary}30;
        }

        .sparkle-float {
          animation: sparkleFloat 4s ease-in-out infinite;
        }

        @keyframes sparkleFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(-5px, -20px) rotate(-5deg); }
          75% { transform: translate(-10px, -10px) rotate(3deg); }
        }

        .glow-orb {
          animation: orbGlow 8s ease-in-out infinite;
        }

        @keyframes orbGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>

      <div style={{ backgroundColor: theme.colors.background, minHeight: "100vh", display: "flex" }}>
        {/* Left Side - Visual Content (opposite of sign in) */}
        <div
          className="hidden lg:flex w-1/2 items-center justify-center p-12 gradient-bg relative overflow-hidden"
          style={{ backgroundColor: themeName === "dark" ? theme.colors.card : `${theme.colors.secondary}10` }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-32 left-32 w-72 h-72 rounded-full glow-orb"
               style={{ background: `radial-gradient(circle, ${theme.colors.secondary} 0%, transparent 70%)` }} />
          <div className="absolute bottom-32 right-32 w-96 h-96 rounded-full glow-orb"
               style={{ background: `radial-gradient(circle, ${theme.colors.primary} 0%, transparent 70%)`, animationDelay: '2s' }} />

          {/* Floating Sparkles */}
          <Sparkles className="absolute top-24 right-40 h-8 w-8 sparkle-float" style={{ color: theme.colors.accent, opacity: 0.6 }} />
          <Sparkles className="absolute bottom-40 left-32 h-6 w-6 sparkle-float" style={{ color: theme.colors.primary, opacity: 0.5, animationDelay: '1s' }} />

          <div className="relative z-10 max-w-lg">
            <div className="mb-10">
              <div className="inline-flex items-center space-x-2 mb-6 p-3 rounded-full"
                   style={{ backgroundColor: `${theme.colors.secondary}20` }}>
                <Sparkles className="h-5 w-5" style={{ color: theme.colors.secondary }} />
                <span className="text-sm font-semibold" style={{ color: theme.colors.secondary }}>
                  Join 50,000+ Companies
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: theme.colors.foreground }}>
                Start Saving
                <br />
                <span style={{
                  background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.primary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Thousands Today
                </span>
              </h2>
              <p className="text-lg" style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                Create your free account and get instant access to exclusive perks worth over $100,000.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="benefit-item flex items-start space-x-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle
                    className="h-6 w-6 shrink-0 mt-0.5"
                    style={{ color: theme.colors.secondary }}
                  />
                  <span className="text-base" style={{ color: theme.colors.foreground, opacity: 0.9 }}>
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="mt-10 p-6 rounded-xl backdrop-blur-sm"
                 style={{
                   backgroundColor: themeName === "dark" ? `${theme.colors.background}80` : `${theme.colors.background}60`,
                   border: `1px solid ${theme.colors.secondary}30`,
                 }}>
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{
                        backgroundColor: i % 2 === 0 ? theme.colors.primary : theme.colors.secondary,
                        border: `2px solid ${themeName === 'dark' ? theme.colors.background : '#fff'}`,
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="h-4 w-4" style={{ color: theme.colors.accent }} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium" style={{ color: theme.colors.foreground, opacity: 0.8 }}>
                Trusted by startups, scale-ups, and enterprises worldwide. Join the community saving big.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form (opposite of sign in) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
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
                Create Your Account
              </h1>
              <p style={{ color: theme.colors.foreground, opacity: 0.6 }}>
                Get started with exclusive perks in minutes
              </p>
            </div>

            {/* Sign Up Form */}
            <div className="space-y-4">
              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.foreground }}>
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5"
                    style={{ color: theme.colors.primary, opacity: 0.5 }}
                  />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 rounded-lg outline-none transition-all input-glow"
                    style={{
                      backgroundColor: themeName === "dark" ? theme.colors.card : `${theme.colors.primary}08`,
                      color: theme.colors.foreground,
                      border: `1px solid ${theme.colors.primary}30`,
                    }}
                  />
                </div>
              </div>

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
                    placeholder="you@company.com"
                    className="w-full pl-12 pr-4 py-3 rounded-lg outline-none transition-all input-glow"
                    style={{
                      backgroundColor: themeName === "dark" ? theme.colors.card : `${theme.colors.primary}08`,
                      color: theme.colors.foreground,
                      border: `1px solid ${theme.colors.primary}30`,
                    }}
                  />
                </div>
              </div>

              {/* Company Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.foreground }}>
                  Company Name <span style={{ opacity: 0.5 }}>(Optional)</span>
                </label>
                <div className="relative">
                  <Building
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5"
                    style={{ color: theme.colors.primary, opacity: 0.5 }}
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your Company"
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

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.foreground }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5"
                    style={{ color: theme.colors.primary, opacity: 0.5 }}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 rounded-lg outline-none transition-all input-glow"
                    style={{
                      backgroundColor: themeName === "dark" ? theme.colors.card : `${theme.colors.primary}08`,
                      color: theme.colors.foreground,
                      border: `1px solid ${theme.colors.primary}30`,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    style={{ color: theme.colors.primary, opacity: 0.5 }}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 rounded cursor-pointer shrink-0"
                  style={{ accentColor: theme.colors.primary }}
                />
                <span className="text-sm" style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                  I agree to the{" "}
                  <a href="#" className="font-medium hover:underline" style={{ color: theme.colors.primary }}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-medium hover:underline" style={{ color: theme.colors.primary }}>
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-lg text-white font-medium flex items-center justify-center space-x-2 transition-all hover:shadow-lg hover:scale-[1.02]"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <span>Create Account</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Sign In Link */}
            <p className="mt-6 text-center text-sm" style={{ color: theme.colors.foreground, opacity: 0.6 }}>
              Already have an account?{" "}
              <a href="/signin" className="font-medium hover:underline" style={{ color: theme.colors.primary }}>
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}