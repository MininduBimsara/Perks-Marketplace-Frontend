// src/app/not-found.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function NotFound() {
  const { theme, themeName } = useTheme();
  const router = useRouter();

  // Popular links to help users navigate
  const popularLinks = [
    { label: "Browse Perks", href: "/", icon: Search },
    { label: "How It Works", href: "/about", icon: HelpCircle },
    { label: "Contact Us", href: "/contact", icon: HelpCircle },
  ];

  return (
    <>
      <style>{`
        .error-animation {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .link-card {
          background-color: ${theme.colors.card};
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .link-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px ${
            themeName === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)"
          };
        }

        .gradient-bg {
          background: linear-gradient(135deg, ${theme.colors.primary}14 0%, ${
        theme.colors.secondary
      }14 100%);
        }

        .error-number {
          background: linear-gradient(135deg, ${theme.colors.primary}, ${
        theme.colors.secondary
      });
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div
        style={{
          backgroundColor: theme.colors.background,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated 404 Number */}
          <div className="error-animation mb-8">
            <h1
              className="error-number font-bold"
              style={{ fontSize: "clamp(6rem, 20vw, 12rem)", lineHeight: 1 }}
            >
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: theme.colors.foreground }}
            >
              Oops! Page Not Found
            </h2>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: theme.colors.foreground, opacity: 0.7 }}
            >
              The page you're looking for seems to have wandered off. Don't
              worry though, there are plenty of great perks waiting for you!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => router.back()}
              className="px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all"
              style={{
                backgroundColor: theme.colors.card,
                color: theme.colors.foreground,
                border: `2px solid ${
                  themeName === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)"
                }`,
              }}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </button>

            <Link href="/">
              <button
                className="px-8 py-4 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 transition-all hover:shadow-lg"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <Home className="h-5 w-5" />
                <span>Back to Home</span>
              </button>
            </Link>
          </div>

          {/* Popular Links */}
          <div className="gradient-bg rounded-2xl p-8 md:p-12">
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: theme.colors.foreground }}
            >
              Popular Destinations
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {popularLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link key={index} href={link.href}>
                    <div className="link-card rounded-xl p-6">
                      <div
                        className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                        style={{
                          backgroundColor: `${theme.colors.primary}1A`,
                        }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: theme.colors.primary }}
                        />
                      </div>
                      <h4
                        className="font-semibold"
                        style={{ color: theme.colors.foreground }}
                      >
                        {link.label}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-12">
            <p
              className="text-sm"
              style={{ color: theme.colors.foreground, opacity: 0.6 }}
            >
              Still can't find what you're looking for?{" "}
              <Link
                href="/contact"
                className="font-medium underline"
                style={{ color: theme.colors.primary }}
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
