"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import ReduxProvider from "../store/ReduxProvider";
import { useAuth } from "@/context/AuthContext";
import AdminLogin from "@/components/layout/AdminLogin";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  return (
    <ReduxProvider>
      {pathname === "/login" ? (<AdminLogin />) : (<>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        
        <div className="flex min-h-screen bg-gray-50 text-gray-900">
          <AdminSidebar />
          <main className="flex-1 p-6 lg:p-10 overflow-auto">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      )}
      </>
      )}
      {/* while auth is loading, show spinner */}
      
    </ReduxProvider>
  );
}