import React from "react";

// You will add your AdminSidebar here later
// import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      {/* <AdminSidebar /> */}
      <main style={{ flexGrow: 1, padding: "1rem" }}>
        <h1>Admin Section</h1>
        {children} {/* This will be your admin page.tsx */}
      </main>
    </div>
  );
}
