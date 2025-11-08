"use client";
import React, { useEffect } from "react";
import CmsSidebar from "@/components/layout/CmsSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "content_editor") {
        router.push("/login");
      }
    }
  }, [user, isLoading, router]);

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
