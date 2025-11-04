import React from "react";
import CmsSidebar from "@/components/layout/CmsSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <CmsSidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
