"use client";

import React from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import ReduxProvider from "../store/ReduxProvider";
import AdminLogin from "@/components/layout/AdminLogin";
import { useAuth } from "@/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <ReduxProvider>
      {/* while auth is loading, show nothing or a spinner */}
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loader">Loading...</div>
        </div>
      ) : !isAuthenticated ? (
        // If not authenticated, show the admin login view (inside ReduxProvider)
        <AdminLogin />
      ) : (
        // Authenticated: render admin UI
        <div className="flex min-h-screen bg-gray-50 text-gray-900">
          <AdminSidebar />
          <main className="flex-1 p-6 lg:p-10 overflow-auto">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      )}
    </ReduxProvider>
  );
}
