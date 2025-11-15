"use client";
import PerksHeader from "@/components/layout/Header";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Debug: This layout should render for all public routes without auth checks
  console.log("[PUBLIC LAYOUT] Rendering - NO AUTH REQUIRED");

  return (
    <>
      <PerksHeader />
      <main>{children}</main>
      <footer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} PerksHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
