"use client";
import React, { useEffect } from "react";
import CmsSidebar from "@/components/layout/CmsSidebar";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Debug: Log when CMS layout is triggered
  console.log(
    "[CMS LAYOUT] user:",
    user?.role,
    "isAuthenticated:",
    isAuthenticated,
    "isLoading:",
    isLoading
  );

  useEffect(() => {
    if (isLoading) return;

    const isCmsRoute = pathname?.startsWith("/cms");
    if (isCmsRoute && (!user || user.role !== "content_editor")) {
      console.log("[CMS LAYOUT] Redirecting to /login - not a content_editor");
      router.push("/login");
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading || !user || user.role !== "content_editor") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <CmsSidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
