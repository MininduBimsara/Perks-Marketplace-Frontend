"use client";
import PerksHeader from "@/components/layout/Header";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
<<<<<<< HEAD
     <PerksHeader />
      <main>
      
          {children}
        
      </main>
=======
      <PerksHeader />
      <main>{children}</main>
>>>>>>> d91f9bb4a196e4fd5e02628ac1bfe47275cce134
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
