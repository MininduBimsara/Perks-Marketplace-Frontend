import React from "react";

// You will add your PublicNavbar and Footer here later
// import PublicNavbar from '@/components/layout/PublicNavbar';
// import Footer from '@/components/layout/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <PublicNavbar /> */}
      <main>
        {children} {/* This will be your page.tsx */}
      </main>
      {/* <Footer /> */}
    </>
  );
}
